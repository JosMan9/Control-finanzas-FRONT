import { LitElement, html } from 'lit';
import { tablaStatusStyles } from './tablaStatus.styles.js';
import "../notificaciones/modalExito.js";
import "../notificaciones/modalError.js";
import "../notificaciones/modalConfirmacion.js";
import "../layout/sidebarMenu.js";

const COLORES = [
  '#10B981', '#0F172A', '#F97316', '#EF4444', '#818CF8',
  '#86EFAC', '#065F46', '#FFFFFF', '#FCA5A5'
];

export class TablaStatus extends LitElement {
  static properties = {
    estados: { type: Array },
    _formNombre: { type: String, state: true },
    _formDesc: { type: String, state: true },
    colorSeleccionado: { type: String },
    _enEdicionId: { type: Number, state: true },
    
    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true }
  };

  static styles = tablaStatusStyles;

  constructor() {
    super();
    this.estados = [];
    this._limpiarFormulario();
    
    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
  }

  _limpiarFormulario() {
    this._enEdicionId = null;
    this._formNombre = '';
    this._formDesc = '';
    this.colorSeleccionado = COLORES[0]; // Default green
  }

  #editarStatus(estado) {
    this._enEdicionId = estado.id;
    this._formNombre = estado.nombre;
    this._formDesc = estado.descripcion || '';
    this.colorSeleccionado = estado.color || COLORES[0];
  }

  #manejarColorPersonalizado(e) {
    const nuevoColor = e.target.value.toUpperCase();
    this.colorSeleccionado = nuevoColor;
  }

  #guardar() {
    if (!this._formNombre.trim()) {
      alert("Por favor ingresa el nombre del status.");
      return;
    }

    if (this._formNombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }

    if (this._enEdicionId) {
      // Update
      const index = this.estados.findIndex(e => e.id === this._enEdicionId);
      if (index !== -1) {
        this.estados[index] = {
          ...this.estados[index],
          nombre: this._formNombre.trim(),
          descripcion: this._formDesc.trim(),
          color: this.colorSeleccionado
        };
        
        this._tituloModalExito = "¡Operación Exitosa!";
        this._mensajeModalExito = `El estado "${this._formNombre}" se ha\nactualizado correctamente.`;
        this._mostrarModalExito = true;
      }
    } else {
      // Create new
      const nuevoEstado = {
        id: Date.now(),
        nombre: this._formNombre.trim(),
        descripcion: this._formDesc.trim(),
        color: this.colorSeleccionado
      };
      this.estados = [...this.estados, nuevoEstado];

      this._tituloModalExito = "¡Operación Exitosa!";
      this._mensajeModalExito = `El estado "${nuevoEstado.nombre}" se ha\ncreado correctamente.`;
      this._mostrarModalExito = true;
    }

    this._limpiarFormulario();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("status-actualizados", { detail: this.estados }));
  }

  #solicitarEliminacion(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const estado = this.estados.find(e => e.id === id);
    const nombre = estado ? estado.nombre : '';

    this.estados = this.estados.filter(e => e.id !== id);
    if (this._enEdicionId === id) {
      this._limpiarFormulario();
    }
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("status-actualizados", { detail: this.estados }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `El estado "${nombre}" se ha\neliminado correctamente.`;
    this._mostrarModalExito = true;
  }

  render() {
    return html`
      <div class="layout">
        <sidebar-menu activeMenu="status"></sidebar-menu>

        <div class="main">
          <div class="top-bar">
            <div class="top-bar-title">Configuración de Status</div>
            <div class="top-right">
              <div class="top-nav">
                <span @click="${() => window.location.href = 'demo-dashboard.html'}">Dashboard</span>
                <span @click="${() => window.location.href = 'demo-gasto.html'}">Gastos</span>
                <span class="active">Configuración</span>
              </div>
              <svg class="config-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <div class="avatar">
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h40v40H0z" fill="#0B192C"/>
                  <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#ffffff"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="page-header">
            <span class="subtitle-badge">Personalización</span>
            <h1>Gestión de Estados</h1>
            <p>Define y personaliza los estados de tus transacciones. Los colores te ayudarán a identificar visualmente el progreso de tus finanzas de un vistazo.</p>
          </div>

          <div class="content-grid">
            
            <div class="left-content">
              <div class="form-card">
                <h3>${this._enEdicionId ? 'Editar Status' : 'Crear Nuevo Status'}</h3>

                <div class="form-group">
                  <label class="form-label">Nombre del Status</label>
                  <input class="form-input" placeholder="Ej. Pagado, En Revisión..." .value="${this._formNombre}" @input="${e => this._formNombre = e.target.value}">
                </div>

                <div class="form-group">
                  <label class="form-label">Descripción</label>
                  <input class="form-input" placeholder="Opcional. Ej. TRANSACCIÓN FINALIZADA" .value="${this._formDesc}" @input="${e => this._formDesc = e.target.value}">
                </div>

                <div class="form-group">
                  <label class="form-label">Selector de Color</label>
                  <div class="color-grid">
                    ${COLORES.map(color => html`
                      <button 
                        class="color-btn ${this.colorSeleccionado === color ? 'selected' : ''}" 
                        style="background-color: ${color}; --active-color: ${color}; ${color === '#FFFFFF' ? 'border: 1px solid #e2e8f0;' : ''}" 
                        @click="${() => this.colorSeleccionado = color}"
                      ></button>
                    `)}
                    <div style="position: relative; display: inline-block; width: 100%;">
                      <input 
                        type="color" 
                        id="customColor" 
                        @input="${this.#manejarColorPersonalizado}" 
                        style="position: absolute; opacity: 0; width: 0; height: 0; z-index: -1;">
                      <button 
                        class="color-btn add-custom ${!COLORES.includes(this.colorSeleccionado) ? 'selected' : ''}" 
                        style="${!COLORES.includes(this.colorSeleccionado) ? `background-color: ${this.colorSeleccionado}; --active-color: ${this.colorSeleccionado}; color: transparent;` : ''}"
                        title="Color personalizado"
                        @click="${() => this.shadowRoot.getElementById('customColor').click()}"
                      >+</button>
                    </div>
                  </div>
                </div>

                <button class="btn-save" @click="${this.#guardar}">Guardar Status</button>
              </div>
            </div>

            <div class="right-content">
              <div class="list-card">
                <div class="list-header">
                  <div class="list-title">
                    <h3>Estados Activos</h3>
                    <p>Visualiza y edita los estados existentes.</p>
                  </div>
                  <div class="count-pill">${this.estados.length} Definidos</div>
                </div>

                <div class="status-list">
                  ${this.estados.map(estado => html`
                    <div class="s-card">
                      <div class="s-dot" style="background-color: ${estado.color || '#10B981'};"></div>
                      <div class="s-info">
                        <div class="s-title">${estado.nombre}</div>
                        <div class="s-desc">${estado.descripcion || 'SIN DESCRIPCIÓN'}</div>
                      </div>
                      <div class="s-actions">
                        <button class="s-btn" @click="${() => this.#editarStatus(estado)}">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          EDITAR
                        </button>
                        <button class="s-btn btn-del" @click="${() => this.#solicitarEliminacion(estado.id)}">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                          BORRAR
                        </button>
                      </div>
                    </div>
                  `)}
                </div>

                <div class="tip-card">
                  <h4>Tip de Gestión</h4>
                  <p>Utiliza el color <strong class="green">Esmeralda</strong> para flujos positivos y <strong class="coral">Coral</strong> para advertencias. Esto mantiene la consistencia editorial de tu tablero.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <modal-exito
        ?abierto="${this._mostrarModalExito}"
        .titulo="${this._tituloModalExito}"
        .mensaje="${this._mensajeModalExito}"
        @modal-exito-cerrado="${() => this._mostrarModalExito = false}">
      </modal-exito>
      <modal-error
        ?abierto="${this._mostrarModalError}"
        @modal-error-cerrado="${() => { this._mostrarModalError = false; }}"
        @modal-error-reintentar="${() => { this._mostrarModalError = false; this.#guardar(); }}">
      </modal-error>
      <modal-confirmacion
        ?abierto="${this._mostrarModalConfirmacion}"
        @modal-confirmacion-cancelar="${() => { this._mostrarModalConfirmacion = false; this._itemAEliminar = null; }}"
        @modal-confirmacion-eliminar="${this.#confirmarEliminacion}">
      </modal-confirmacion>
    `;
  }
}

customElements.define("tabla-status", TablaStatus);
