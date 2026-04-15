import { LitElement, html } from 'lit';
import { tablaGastoStyles } from './tablaGasto.styles.js';
import '../layout/sidebarMenu.js';
import './modals/modalAgregarGasto.js';
import '../notificaciones/modalConfirmacion.js';
import '../notificaciones/modalExito.js';
import '../notificaciones/modalError.js';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export class TablaGasto extends LitElement {
  static properties = {
    gastos: { type: Array },
    ingresos: { type: Array },
    tipoGastos: { type: Array },
    personas: { type: Array },
    _searchQuery: { type: String, state: true },
    _filtroTipo: { type: String, state: true },
    _filtroCubierto: { type: String, state: true }, // 'all', 'yes', 'no'
    _filtroMes: { type: String, state: true },
    _filtroAño: { type: String, state: true },
    _filtroIngreso: { type: String, state: true },
    _filtroPersona: { type: String, state: true },
    _paginaActual: { type: Number, state: true },
    _itemsPorPagina: { type: Number, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _mostrarModalExito: { type: Boolean, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true },
    _mensajeModalExito: { type: String, state: true },
    _tituloModalExito: { type: String, state: true }
  };

  static styles = [tablaGastoStyles];

  constructor() {
    super();
    this.gastos = [];
    this.ingresos = [];
    this.tipoGastos = [];
    this.personas = [];

    this._searchQuery = '';
    this._filtroTipo = '';
    this._filtroCubierto = 'all';
    this._filtroMes = '';
    this._filtroAño = '';
    this._filtroIngreso = '';
    this._filtroPersona = '';

    this._paginaActual = 1;
    this._itemsPorPagina = 8;
    this._mostrarModalConfirmacion = false;
    this._mostrarModalExito = false;
    this._mostrarModalError = false;
    this._itemAEliminar = null;
    this._mensajeModalExito = '';
    this._tituloModalExito = '';
    this._handleResize = this._updateItemsPerPage.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
    this._updateItemsPerPage();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    super.disconnectedCallback();
  }

  _updateItemsPerPage() {
    const width = window.innerWidth;
    let newCount = 8;
    if (width > 1600) newCount = 12;
    else if (width > 1200) newCount = 10;
    else if (width > 768) newCount = 8;
    else newCount = 4;

    if (this._itemsPorPagina !== newCount) {
      this._itemsPorPagina = newCount;
    }
  }

  get #filteredGastos() {
    let result = [...this.gastos];

    if (this._searchQuery) {
      const q = this._searchQuery.toLowerCase();
      result = result.filter(g => g.concepto.toLowerCase().includes(q));
    }

    if (this._filtroTipo) {
      result = result.filter(g => g.tipoGasto?.nombre === this._filtroTipo);
    }

    if (this._filtroCubierto !== 'all') {
      const target = this._filtroCubierto === 'yes';
      result = result.filter(g => g.esCubierto === target);
    }

    if (this._filtroMes) {
      result = result.filter(g => this.#obtenerNombreMes(g.fechaOperacion) === this._filtroMes);
    }

    if (this._filtroAño) {
      result = result.filter(g => new Date(g.fechaOperacion).getFullYear().toString() === this._filtroAño);
    }

    if (this._filtroIngreso) {
      result = result.filter(g => g.ingreso?.nombre === this._filtroIngreso);
    }

    if (this._filtroPersona) {
      result = result.filter(g => g.persona?.nombre === this._filtroPersona);
    }

    return result;
  }

  get #paginatedGastos() {
    const start = (this._paginaActual - 1) * this._itemsPorPagina;
    return this.#filteredGastos.slice(start, start + this._itemsPorPagina);
  }

  #obtenerNombreMes(fechaString) {
    if (!fechaString) return null;
    const date = new Date(fechaString);
    return MESES[date.getUTCMonth()];
  }

  formatMonto(monto) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(monto || 0);
  }

  formatFecha(fechaString) {
    const date = new Date(fechaString);
    const day = date.getUTCDate();
    const month = MESES[date.getUTCMonth()].substring(0, 3);
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }

  #abrirModal(gasto = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-gasto');
    if (modal) {
      if (gasto) modal.abrirParaEditar(gasto);
      else modal.abrir();
    }
  }

  #eliminarGasto(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    this.gastos = this.gastos.filter(g => g.id !== this._itemAEliminar);
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('gastos-actualizados', { detail: this.gastos }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = '¡Gasto Eliminado!';
    this._mensajeModalExito = 'El registro ha sido removido de su historial patrimonial con éxito.';
    this._mostrarModalExito = true;
  }

  #notificarExito(accion) {
    this._tituloModalExito = accion === 'edit' ? '¡Gasto Actualizado!' : '¡Gasto Guardado!';
    this._mensajeModalExito = accion === 'edit' 
      ? 'Los cambios han sido aplicados correctamente a su registro de capital.' 
      : 'Su nueva salida de capital ha sido registrada de forma segura.';
    this._mostrarModalExito = true;
  }

  #handleGastoAgregado(e) {
    const nuevoGasto = e.detail;
    this.gastos = [...this.gastos, nuevoGasto];
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('gastos-actualizados', { detail: this.gastos }));
    this.#notificarExito('add');
  }

  #handleGastoEditado(e) {
    const gastoEditado = e.detail;
    this.gastos = this.gastos.map(g => g.id === gastoEditado.id ? gastoEditado : g);
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('gastos-actualizados', { detail: this.gastos }));
    this.#notificarExito('edit');
  }

  renderIcon(type) {
    if (type === 'building') return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3Z"/><path d="M9 17h1"/><path d="M14 17h1"/><path d="M9 13h1"/><path d="M14 13h1"/><path d="M19 7v14H5V7"/></svg>`;
    if (type === 'bolt') return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    if (type === 'cloud') return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.315-1.433-4.293-3.454-5.087C19.294 4.545 16.037 2 12.16 2 9.074 2 6.377 3.518 4.774 5.86 2.057 6.448 0 8.87 0 11.75 0 15.195 2.805 18 6.25 18h11.25"/></svg>`;
    return html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`;
  }

  render() {
    const filtered = this.#filteredGastos;
    const paginated = this.#paginatedGastos;
    const totalPages = Math.ceil(filtered.length / this._itemsPorPagina) || 1;

    const totalGastado = filtered.reduce((acc, g) => acc + (g.monto || 0), 0);
    const cubiertosCount = filtered.filter(g => g.esCubierto).length;
    const porcentajeCubierto = filtered.length > 0 ? Math.round((cubiertosCount / filtered.length) * 100) : 0;

    return html`
      <div class="layout">
        <sidebar-menu activeMenu="gasto"></sidebar-menu>

        <div class="main">
          
          <div class="top-bar">
            <div class="top-right">
              <div class="top-nav">
                <span @click="${() => window.location.href = 'demo-dashboard.html'}">Dashboard</span>
                <span class="active">Gastos</span>
                <span @click="${() => window.location.href = 'demo-mes.html'}">Configuración</span>
              </div>
              <svg class="config-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <div class="avatar">
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h40v40H0z" fill="#0B192C"/>
                  <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#ffffff"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="page-header">
            <div class="header-left">
              <h1>Gestionar Gastos</h1>
              <p>Supervise su flujo de capital y analice cada salida de su patrimonio de forma eficiente.</p>
            </div>
            <button class="btn-añadir" @click="${() => this.#abrirModal()}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nuevo Gasto
            </button>
          </div>

          <div class="content-grid">
            
            <div class="left-panel">
              <div class="search-container">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input 
                  class="search-input" 
                  placeholder="Buscar por concepto..." 
                  .value="${this._searchQuery}"
                  @input="${e => this._searchQuery = e.target.value}"
                >
              </div>

              <div class="filters-card">
                <div class="filter-group">
                  <label class="filter-label">Tipo</label>
                  <select class="filter-select" @change="${e => this._filtroTipo = e.target.value}">
                    <option value="">Todos</option>
                    ${(this.tipoGastos || []).map(tg => html`<option value="${tg.nombre}">${tg.nombre}</option>`)}
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">Estado</label>
                  <div class="toggle-container">
                    <button class="toggle-btn ${this._filtroCubierto === 'yes' ? 'active' : ''}" @click="${() => this._filtroCubierto = 'yes'}">Si</button>
                    <button class="toggle-btn ${this._filtroCubierto === 'no' ? 'active' : ''}" @click="${() => this._filtroCubierto = 'no'}">No</button>
                    <button class="toggle-btn ${this._filtroCubierto === 'all' ? 'active' : ''}" @click="${() => this._filtroCubierto = 'all'}">Todos</button>
                  </div>
                </div>
                <div class="filter-group">
                  <label class="filter-label">Mes</label>
                  <select class="filter-select" @change="${e => this._filtroMes = e.target.value}">
                    <option value="">Todos</option>
                    ${MESES.map(m => html`<option value="${m}">${m}</option>`)}
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">Año</label>
                  <select class="filter-select" @change="${e => this._filtroAño = e.target.value}">
                    <option value="">Todos</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">Ingreso</label>
                  <select class="filter-select" @change="${e => this._filtroIngreso = e.target.value}">
                    <option value="">Todos</option>
                    ${(this.ingresos || []).map(i => html`<option value="${i.nombre}">${i.nombre}</option>`)}
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">Responsable</label>
                  <select class="filter-select" @change="${e => this._filtroPersona = e.target.value}">
                    <option value="">Todos</option>
                    ${(this.personas || []).map(p => html`<option value="${p.nombre}">${p.nombre}</option>`)}
                  </select>
                </div>
              </div>

              <div class="table-container">
                <div class="table-header">
                  <span>Concepto</span>
                  <span>Monto</span>
                  <span>Fecha</span>
                  <span>Estado</span>
                  <span>Tipo</span>
                  <span>Ingreso</span>
                  <span>Responsable</span>
                  <span>Acciones</span>
                </div>
                
                ${paginated.map(g => html`
                  <div class="row">
                    <div class="concepto-cell">
                      <div class="icon-bg ${g.tipoGasto?.icono || 'default'}">
                        ${this.renderIcon(g.tipoGasto?.icono)}
                      </div>
                      <div class="concepto-info">
                        <span class="concepto-text">${g.concepto}</span>
                        <span class="concepto-subtext">${g.tipoGasto?.nombre || 'General'}</span>
                      </div>
                    </div>
                    <div class="monto-text" data-label="Monto">${this.formatMonto(g.monto)}</div>
                    <div class="fecha-text" data-label="Fecha">${this.formatFecha(g.fechaOperacion)}</div>
                    <div data-label="Estado">
                      <span class="badge ${g.esCubierto ? 'badge-cubierto' : 'badge-no-cubierto'}">
                        ${g.esCubierto ? 'Si' : 'No'}
                      </span>
                    </div>
                    <div class="persona-text" data-label="Tipo">${g.tipoGasto?.nombre || 'General'}</div>
                    <div class="persona-text" data-label="Ingreso">${g.ingreso?.nombre || 'N/A'}</div>
                    <div class="persona-text" data-label="Responsable">${g.persona?.alias || g.persona?.nombre || 'N/A'}</div>
                    <div class="actions-cell">
                      <button class="btn-action btn-edit" @click="${() => this.#abrirModal(g)}" title="Editar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="btn-action btn-del" @click="${() => this.#eliminarGasto(g.id)}" title="Eliminar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                `)}

                ${paginated.length === 0 ? html`
                  <div style="text-align:center; padding: 48px; color: var(--gray-400); font-size: 14px;">
                    No hay registros que coincidan con los filtros.
                  </div>
                ` : ''}

                <div class="footer-info">
                  <div class="count-info">
                    Mostrando ${Math.min(paginated.length, this._itemsPorPagina)} de ${filtered.length} gastos
                  </div>
                  <div class="pagination">
                    <div class="page-num" @click="${() => this._paginaActual = Math.max(1, this._paginaActual - 1)}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </div>

                    ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => html`
                      <div class="page-num ${this._paginaActual === page ? 'active' : ''}" @click="${() => this._paginaActual = page}">
                        ${page}
                      </div>
                    `)}

                    <div class="page-num" @click="${() => this._paginaActual = Math.min(totalPages, this._paginaActual + 1)}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="right-panel">
              <div class="stats-card">
                <h3>Resumen Patrimonial</h3>
                <div class="total-value">${this.formatMonto(totalGastado)}</div>
                <div class="total-label">Gasto Total Acumulado</div>
                
                <div class="stat-row">
                  <div class="stat-item">
                    <span class="stat-num" style="color: #10B981;">${porcentajeCubierto}%</span>
                    <span class="stat-name">Cubierto</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-num" style="color: #6366f1;">${filtered.length}</span>
                    <span class="stat-name">Transacciones</span>
                  </div>
                </div>
              </div>

              <div class="banner-tip">
                <div class="banner-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2"/><path d="M12 18v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg>
                </div>
                <div class="banner-content">
                  <h4>Consejo Lendora</h4>
                  <p>Categorizar sus salidas permite identificar fugas de capital y optimizar su estrategia fiscal de manera proactiva.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <modal-agregar-gasto
        .ingresos="${this.ingresos}"
        .tipoGastos="${this.tipoGastos}"
        .personas="${this.personas}"
        @gasto-agregado="${this.#handleGastoAgregado}"
        @gasto-editado="${this.#handleGastoEditado}">
      </modal-agregar-gasto>

      <modal-exito
        ?abierto="${this._mostrarModalExito}"
        .titulo="${this._tituloModalExito}"
        .mensaje="${this._mensajeModalExito}"
        @modal-exito-cerrado="${() => this._mostrarModalExito = false}">
      </modal-exito>

      <modal-error
        ?abierto="${this._mostrarModalError}"
        @modal-error-cerrado="${() => this._mostrarModalError = false}">
      </modal-error>

      <modal-confirmacion
        ?abierto="${this._mostrarModalConfirmacion}"
        @modal-confirmacion-cancelar="${() => { this._mostrarModalConfirmacion = false; this._itemAEliminar = null; }}"
        @modal-confirmacion-eliminar="${this.#confirmarEliminacion}">
      </modal-confirmacion>
    `;
  }
}

customElements.define('tabla-gasto', TablaGasto);
