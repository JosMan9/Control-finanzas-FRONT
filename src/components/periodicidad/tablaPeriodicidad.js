import { LitElement, html } from 'lit';
import { tablaPeriodicidadStyles } from './tablaPeriodicidad.styles.js';
import './modals/modalAgregarPeriodicidad.js';
import '../notificaciones/modalExito.js';
import '../notificaciones/modalError.js';
import '../notificaciones/modalConfirmacion.js';
import '../layout/sidebarMenu.js';
export class TablaPeriodicidad extends LitElement {
  static properties = {
    titulo: { type: String },
    periodicidades: { type: Array },
    cargando: { type: Boolean },
    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true }
  };

  static styles = tablaPeriodicidadStyles;

  constructor() {
    super();
    this.titulo = 'Configuración de Periodicidad';
    this.periodicidades = [];
    this.cargando = false;
    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
  }

  #abrirModal(periodicidad = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-periodicidad');
    if (modal) {
      if (typeof periodicidad.detail === 'number' || periodicidad === null || periodicidad instanceof Event) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(periodicidad);
      }
    }
  }

  #editarPeriodicidad(periodicidad) {
    this.#abrirModal(periodicidad);
  }

  #eliminarPeriodicidad(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const periodicidad = this.periodicidades.find(p => p.id === id);
    const nombre = periodicidad ? periodicidad.nombre : '';

    this.periodicidades = this.periodicidades.filter(p => p.id !== id);
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', {
      detail: this.periodicidades
    }));
    this.dispatchEvent(new CustomEvent('periodicidad-eliminado-id', {
      detail: id
    }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `La periodicidad ${nombre} se ha\neliminado correctamente.`;
    this._mostrarModalExito = true;
  }

  #toggleActivo(p, e) {
    const isChecked = e.target.checked;
    const periodicidadEditada = { ...p, activo: isChecked };
    this.#manejarPeriodicidadEditada({ detail: periodicidadEditada });
  }

  #manejarPeriodicidadAgregada(e) {
    const nuevaPeriodicidad = e.detail;
    if (nuevaPeriodicidad.nombre && nuevaPeriodicidad.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }
    const existe = this.periodicidades.find(p => p.id === nuevaPeriodicidad.id);
    if (existe) return;

    if (!nuevaPeriodicidad.id) nuevaPeriodicidad.id = Date.now();
    this.periodicidades = [...this.periodicidades, nuevaPeriodicidad];
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', { detail: this.periodicidades }));
    this.dispatchEvent(new CustomEvent('periodicidad-creada', { detail: nuevaPeriodicidad }));
    
    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `La periodicidad ${nuevaPeriodicidad.nombre} se ha\ncreado correctamente.`;
    this._mostrarModalExito = true;
  }

  #manejarPeriodicidadEditada(e) {
    const periodicidadEditada = e.detail;
    if (periodicidadEditada.nombre && periodicidadEditada.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }
    const index = this.periodicidades.findIndex(p => p.id === periodicidadEditada.id);
    if (index !== -1) {
      this.periodicidades = [
        ...this.periodicidades.slice(0, index),
        periodicidadEditada,
        ...this.periodicidades.slice(index + 1)
      ];
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', { detail: this.periodicidades }));
      this.dispatchEvent(new CustomEvent('periodicidad-actualizada', { detail: periodicidadEditada }));

      this._tituloModalExito = "¡Operación Exitosa!";
      this._mensajeModalExito = `La periodicidad ${periodicidadEditada.nombre} se ha\nactualizado correctamente.`;
      this._mostrarModalExito = true;
    }
  }

  #getIcon(nombre) {
    const nameLower = (nombre || '').toLowerCase();
    if (nameLower.includes('quincena') || nameLower.includes('quincenal')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="8" y="14" width="8" height="4" rx="1" ry="1"/></svg>`;
    } else if (nameLower.includes('mes') || nameLower.includes('mensual')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    } else if (nameLower.includes('trimestral')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`;
    } else if (nameLower.includes('semana')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    } else {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    }
  }

  get #renderModalPeriodicidad() {
    return html`
      <modal-agregar-periodicidad
        @periodicidad-agregada="${this.#manejarPeriodicidadAgregada}"
        @periodicidad-editada="${this.#manejarPeriodicidadEditada}">
      </modal-agregar-periodicidad>
    `;
  }

  render() {
    const activos = this.periodicidades.filter(p => p.activo).length;
    const inactivos = this.periodicidades.length - activos;

    return html`
      <div class="layout">
        <sidebar-menu activeMenu="periodicidad"></sidebar-menu>

        <div class="main">
          <div class="top-bar">
            <div class="top-nav">
              <span @click="${() => window.location.href = 'demo-dashboard.html'}">Dashboard</span>
              <span @click="${() => window.location.href = 'demo-gasto.html'}">Gastos</span>
              <span class="active">Configuración</span>
            </div>
            <div class="avatar">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h40v40H0z" fill="#0F763E"/>
                <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#D1FAE5"/>
              </svg>
            </div>
          </div>

          <div class="page-header">
            <h1>${this.titulo}</h1>
            <p>Define y gestiona los ciclos de facturación y gastos recurrentes de tu cartera.</p>
          </div>

          <div class="content-grid">
            <div class="resumen-card">
              <div class="resumen-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Resumen
              </div>
              <div class="stat-row">
                <span>Activos</span>
                <span class="stat-val">${activos < 10 ? '0' + activos : activos}</span>
              </div>
              <div class="stat-row">
                <span>Inactivos</span>
                <span class="stat-val">${inactivos < 10 ? '0' + inactivos : inactivos}</span>
              </div>
              <p class="quote">"La periodicidad ayuda a proyectar el flujo de caja anual con precisión quirúrgica."</p>
            </div>

            <div class="lista-section">
              <div class="lista-header">
                <h2>Esquemas Definidos</h2>
                <button class="btn-add-schema" @click="${this.#abrirModal}">
                  + Añadir Esquema
                </button>
              </div>

              <div class="schema-list">
                ${this.periodicidades.map(p => html`
                  <div class="schema-card ${p.activo ? 'active' : 'inactive'}">
                    <div class="schema-icon">${this.#getIcon(p.nombre)}</div>
                    <div class="schema-info">
                      <div class="schema-title">${p.nombre}</div>
                      <div class="schema-desc">Cada ${p.dias} días naturales</div>
                    </div>
                    <div class="schema-actions">
                      <button class="action-btn" @click="${() => this.#editarPeriodicidad(p)}" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="action-btn del-btn" @click="${() => this.#eliminarPeriodicidad(p.id)}" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                      <label class="switch">
                        <input type="checkbox" .checked="${p.activo}" @change="${(e) => this.#toggleActivo(p, e)}">
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          </div>

          <div class="banner-footer">
            <div class="banner-img-placeholder"></div>
            <div class="banner-overlay"></div>
            <div class="banner-content">
              <h2>Dominio del Tiempo</h2>
              <p>El secreto de la libertad financiera no es ganar más, sino entender cuándo sale cada moneda.</p>
            </div>
          </div>

        </div>
      </div>
      ${this.#renderModalPeriodicidad}
      <modal-exito
        ?abierto="${this._mostrarModalExito}"
        .titulo="${this._tituloModalExito}"
        .mensaje="${this._mensajeModalExito}"
        @modal-exito-cerrado="${() => this._mostrarModalExito = false}">
      </modal-exito>
      <modal-error
        ?abierto="${this._mostrarModalError}"
        @modal-error-cerrado="${() => this._mostrarModalError = false}"
        @modal-error-reintentar="${() => { this._mostrarModalError = false; this.#abrirModal(); }}">
      </modal-error>
      <modal-confirmacion
        ?abierto="${this._mostrarModalConfirmacion}"
        @modal-confirmacion-cancelar="${() => { this._mostrarModalConfirmacion = false; this._itemAEliminar = null; }}"
        @modal-confirmacion-eliminar="${this.#confirmarEliminacion}">
      </modal-confirmacion>
    `;
  }
}

customElements.define('tabla-periodicidad', TablaPeriodicidad);
