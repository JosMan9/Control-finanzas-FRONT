import { LitElement, html } from "lit";
import { tablaQuincenaStyles } from "./tablaQuincena.styles.js";
import "./modals/modalAgregarQuincena.js";
import "../notificaciones/modalExito.js";
import "../notificaciones/modalError.js";
import "../notificaciones/modalConfirmacion.js";
import "../layout/sidebarMenu.js";

export class TablaQuincena extends LitElement {
  static properties = {
    titulo: { type: String },
    quincenas: { type: Array },
    cargando: { type: Boolean },
    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true }
  };

  static styles = tablaQuincenaStyles;

  constructor() {
    super();
    this.titulo = "Configuración de Quincenas";
    this.quincenas = [];
    this.cargando = false;
    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
  }

  _formatRange(fechaString) {
    if (!fechaString) return "Fecha no definida";
    const start = new Date(fechaString);
    if (isNaN(start)) return "Fecha inválida";
    const end = new Date(start);
    end.setDate(end.getDate() + 14); // Simulate 15 days fortnight

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formatStr = (date) => date.toLocaleDateString('es-ES', options).replace('.', '');
    return `${formatStr(start)} - ${formatStr(end)}`;
  }

  _getStatus(fechaString) {
    if (!fechaString) return { status: 'pendiente', label: 'Pendiente' };
    const start = new Date(fechaString);
    const end = new Date(start);
    end.setDate(end.getDate() + 14);
    const today = new Date(); // You could mock today if needed

    // As in mock, simulate today being Jan 20th 2024 to match image if we want consistent En Curso matches
    // But dynamic is better.
    if (today > end) return { status: 'completado', label: 'Completado' };
    if (today >= start && today <= end) return { status: 'en-curso', label: 'En Curso' };
    return { status: 'pendiente', label: 'Pendiente' };
  }

  #abrirModal(quincena = null) {
    const modal = this.shadowRoot.querySelector("modal-agregar-quincena");
    if (modal) {
      if (typeof quincena.detail === "number" || quincena === null || quincena instanceof Event) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(quincena);
      }
    }
  }

  #editarQuincena(quincena) {
    this.#abrirModal(quincena);
  }

  #eliminarQuincena(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const quincena = this.quincenas.find(q => q.id === id);
    const nombre = quincena ? quincena.nombre : '';

    this.quincenas = this.quincenas.filter(q => q.id !== id);
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent("quincenas-actualizadas", { detail: this.quincenas }));
    this.dispatchEvent(new CustomEvent("quincena-eliminada-id", { detail: id }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `La quincena ${nombre} se ha\neliminado correctamente.`;
    this._mostrarModalExito = true;
  }

  #manejarQuincenaAgregada(e) {
    const nuevaQuincena = e.detail;
    if (nuevaQuincena.nombre && nuevaQuincena.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }
    const existe = this.quincenas.find(q => q.id === nuevaQuincena.id);
    if (existe) return;

    if (!nuevaQuincena.id) nuevaQuincena.id = Date.now();
    this.quincenas = [...this.quincenas, nuevaQuincena];
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent("quincenas-actualizadas", { detail: this.quincenas }));
    this.dispatchEvent(new CustomEvent("quincena-creada", { detail: nuevaQuincena }));

    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `La quincena ${nuevaQuincena.nombre} se ha\ncreado correctamente.`;
    this._mostrarModalExito = true;
  }

  #manejarQuincenaEditada(e) {
    const quincenaEditada = e.detail;
    if (quincenaEditada.nombre && quincenaEditada.nombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }
    const index = this.quincenas.findIndex(q => q.id === quincenaEditada.id);
    if (index !== -1) {
      this.quincenas = [
        ...this.quincenas.slice(0, index),
        quincenaEditada,
        ...this.quincenas.slice(index + 1),
      ];
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent("quincenas-actualizadas", { detail: this.quincenas }));
      this.dispatchEvent(new CustomEvent("quincena-actualizada", { detail: quincenaEditada }));

      this._tituloModalExito = "¡Operación Exitosa!";
      this._mensajeModalExito = `La quincena ${quincenaEditada.nombre} se ha\nactualizado correctamente.`;
      this._mostrarModalExito = true;
    }
  }

  render() {
    return html`
      <div class="layout">
        <sidebar-menu activeMenu="quincena"></sidebar-menu>

        <div class="main">
          <div class="top-bar">
            <div class="top-nav">
              <span @click="${() => window.location.href = 'demo-dashboard.html'}">Dashboard</span>
              <span @click="${() => window.location.href = 'demo-gasto.html'}">Gastos</span>
              <span class="active">Configuración</span>
            </div>
            <div class="avatar">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h40v40H0z" fill="#0B192C"/>
                <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#ffffff"/>
              </svg>
            </div>
          </div>

          <div class="page-header">
            <h1>${this.titulo}</h1>
            <p>Gestione los ciclos de pago y periodos de facturación para mantener el control preciso de sus flujos financieros mensuales.</p>
          </div>

          <div class="content-grid">
            
            <div class="left-content">
              <div class="list-section-title">Periodos Activos</div>
              <div class="list-container">
                ${this.quincenas.map(q => {
      const state = this._getStatus(q.fecha);
      return html`
                    <div class="q-card ${state.status}">
                      <div class="icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                      <div class="q-info">
                        <div class="q-title">${q.nombre}</div>
                        <div class="q-dates">${this._formatRange(q.fecha)}</div>
                      </div>
                      <div class="badge ${state.status}">
                        ${state.label}
                      </div>
                      <div class="q-actions">
                        <button class="action-btn" @click="${() => this.#editarQuincena(q)}" title="Editar">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="action-btn del-btn" @click="${() => this.#eliminarQuincena(q.id)}" title="Eliminar">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                      </div>
                    </div>
                  `;
    })}
              </div>
              <button class="btn-add-custom" @click="${this.#abrirModal}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Añadir Periodo Personalizado
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <modal-agregar-quincena
        @quincena-agregada="${this.#manejarQuincenaAgregada}"
        @quincena-editada="${this.#manejarQuincenaEditada}">
      </modal-agregar-quincena>
      
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

customElements.define("tabla-quincena", TablaQuincena);
