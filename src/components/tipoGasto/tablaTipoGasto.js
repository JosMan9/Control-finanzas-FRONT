import { LitElement, html } from 'lit';
import { tablaTipoGastoStyles } from './tablaTipoGasto.styles.js';
import './modals/modalAgregarTipoGasto.js';
import '../notificaciones/modalExito.js';
import '../notificaciones/modalError.js';
import '../notificaciones/modalConfirmacion.js';
import '../layout/sidebarMenu.js';

export class TablaTipoGasto extends LitElement {
  static properties = {
    titulo: { type: String },
    tiposGasto: { type: Array },
    cargando: { type: Boolean },
    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true }
  };

  static styles = tablaTipoGastoStyles;

  constructor() {
    super();
    this.titulo = 'Tipos de Gasto';
    this.tiposGasto = [];
    this.cargando = false;
    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
  }

  #getIconForType(tipo) {
    const iconKey = tipo.icono || '';
    if (iconKey === 'building') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3Z"/><path d="M19 7v14H5V7"/></svg>`;
    if (iconKey === 'bolt') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    if (iconKey === 'cloud') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.315-1.433-4.293-3.454-5.087C19.294 4.545 16.037 2 12.16 2 9.074 2 6.377 3.518 4.774 5.86 2.057 6.448 0 8.87 0 11.75 0 15.195 2.805 18 6.25 18h11.25"/></svg>`;
    if (iconKey === 'shopping-cart') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
    if (iconKey === 'car') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
    if (iconKey === 'coffee') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;
    if (iconKey === 'heart') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    if (iconKey === 'briefcase') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
    if (iconKey === 'credit-card') return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
    
    // Fallback based on name (legacy)
    const text = (tipo.nombre || '').toLowerCase();
    if (text.includes('tarjeta')) return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`;
    return html`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`;
  }

  #abrirModal(tipoGasto = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-tipo-gasto');
    if (modal) {
      if (typeof tipoGasto.detail === 'number' || tipoGasto instanceof Event || tipoGasto === null) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(tipoGasto);
      }
    }
  }

  #editarTipoGasto(tipoGasto) {
    this.#abrirModal(tipoGasto);
  }

  #solicitarEliminacion(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const tipo = this.tiposGasto.find(t => t.id === id);
    const nombre = tipo ? tipo.nombre : '';

    this.tiposGasto = this.tiposGasto.filter(t => t.id !== id);
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', { detail: this.tiposGasto }));
    this.dispatchEvent(new CustomEvent('tipo-gasto-eliminado', { detail: id }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Categoría Eliminada!";
    this._mensajeModalExito = `El tipo de gasto "${nombre}" se ha\neliminado de tu sistema.`;
    this._mostrarModalExito = true;
  }

  #manejarTipoGastoAgregado(e) {
    const nuevoTipoGasto = e.detail;
    if (nuevoTipoGasto.nombre && nuevoTipoGasto.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }

    const existe = this.tiposGasto.find(t => t.id === nuevoTipoGasto.id);
    if (existe) return;

    if (!nuevoTipoGasto.id) nuevoTipoGasto.id = Date.now();
    this.tiposGasto = [...this.tiposGasto, nuevoTipoGasto];
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', { detail: this.tiposGasto }));
    this.dispatchEvent(new CustomEvent('tipo-gasto-creado', { detail: nuevoTipoGasto }));

    this._tituloModalExito = "¡Categoría Agregada!";
    this._mensajeModalExito = `El tipo de gasto "${nuevoTipoGasto.nombre}" se ha\ncreado correctamente.`;
    this._mostrarModalExito = true;
  }

  #manejarTipoGastoEditado(e) {
    const tipoGastoEditado = e.detail;
    if (tipoGastoEditado.nombre && tipoGastoEditado.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }

    const index = this.tiposGasto.findIndex(t => t.id === tipoGastoEditado.id);
    if (index !== -1) {
      this.tiposGasto = [
        ...this.tiposGasto.slice(0, index),
        tipoGastoEditado,
        ...this.tiposGasto.slice(index + 1)
      ];
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', { detail: this.tiposGasto }));
      this.dispatchEvent(new CustomEvent('tipo-gasto-actualizado', { detail: tipoGastoEditado }));

      this._tituloModalExito = "¡Categoría Modificada!";
      this._mensajeModalExito = `El tipo de gasto "${tipoGastoEditado.nombre}" se ha\nactualizado correctamente.`;
      this._mostrarModalExito = true;
    }
  }

  render() {
    return html`
      <div class="layout">
        
        <sidebar-menu activeMenu="tipoGasto"></sidebar-menu>

        <div class="main">
          
          <div class="top-bar">
            <div></div> <!-- empty spacer -->
            <div class="top-right">
              <div class="top-nav">
                <span @click="${() => window.location.href = 'demo-dashboard.html'}">Resumen</span>
                <span class="active">Configuración</span>
                <span>Reportes</span>
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
            <div class="header-left">
              <h1>Tipos de Gasto</h1>
              <p>Administra las categorías y naturalezas de tus egresos para un análisis detallado de tu salud financiera.</p>
            </div>
            <button class="btn-header-add" @click="${this.#abrirModal}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nuevo Tipo
            </button>
          </div>

          <div class="content-grid">
            
            <!-- List Section -->
            <div class="list-container">
              <div class="list-header">
                <h3>Categorías Activas</h3>
                <div class="count-badge">${this.tiposGasto.length} CATEGORÍAS</div>
              </div>
              
              <div class="cat-list">
                ${this.tiposGasto.map(t => html`
                  <div class="cat-card">
                    <div class="cat-icon">
                       ${this.#getIconForType(t)}
                    </div>
                    <div class="cat-name">${t.nombre}</div>
                    <div class="cat-actions">
                      <button class="action-btn" @click="${() => this.#editarTipoGasto(t)}" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="action-btn del-btn" @click="${() => this.#solicitarEliminacion(t.id)}" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
                <div class="add-dashed-box" @click="${this.#abrirModal}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Agregar nueva categoría
                </div>
              </div>
            </div>

            <!-- Right Info Section -->
              <div class="tip-card">
                <div class="tip-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21h6"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M12 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 10v4"/></svg>
                </div>
                <div class="tip-content">
                  <h4>Tip de Ahorro</h4>
                  <p>Agrupa tus "Gastos de Tarjeta" por banco para identificar dónde pagas más comisiones anuales.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <modal-agregar-tipo-gasto
        @tipo-gasto-agregado="${this.#manejarTipoGastoAgregado}"
        @tipo-gasto-editado="${this.#manejarTipoGastoEditado}">
      </modal-agregar-tipo-gasto>
      
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

customElements.define('tabla-tipo-gasto', TablaTipoGasto);
