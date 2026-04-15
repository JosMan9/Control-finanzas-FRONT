import { LitElement, html } from "lit";
import { tablaMesStyles } from "./tablaMes.styles.js";
import "../notificaciones/modalExito.js";
import "../notificaciones/modalError.js";
import "../notificaciones/modalConfirmacion.js";
import "../layout/sidebarMenu.js";

export class TablaMes extends LitElement {
  static properties = {
    titulo: { type: String },
    meses: { type: Array },
    cargando: { type: Boolean },
    _mesActualId: { type: Number, state: true },
    _modalAbierto: { type: Boolean, state: true },
    _mesEditando: { type: Object, state: true },
    _nombreInput: { type: String, state: true },
    _esMesActual: { type: Boolean, state: true },
    _inputError: { type: String, state: true },
    _draggedIndex: { type: Number, state: true },
    _dragOverIndex: { type: Number, state: true },
    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true }
  };

  static styles = tablaMesStyles;

  constructor() {
    super();
    this.titulo = "Configuración de Meses";
    this.meses = [];
    this.cargando = false;
    this._mesActualId = null;
    this._modalAbierto = false;
    this._mesEditando = null;
    this._nombreInput = "";
    this._esMesActual = false;
    this._inputError = "";
    this._draggedIndex = null;
    this._dragOverIndex = null;
    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
  }

  #abrirModal(mes = null) {
    this._mesEditando = mes;
    this._nombreInput = mes?.nombreMes ?? "";
    this._esMesActual = mes ? this._mesActualId === mes.id : false;
    this._inputError = "";
    this._modalAbierto = true;
  }

  #cerrarModal() {
    this._modalAbierto = false;
    this._mesEditando = null;
    this._nombreInput = "";
    this._esMesActual = false;
    this._inputError = "";
  }

  #guardar() {
    const nombre = this._nombreInput.trim();
    if (!nombre) { this._inputError = "El nombre del mes es requerido."; return; }
    
    // Simulate error scenario
    if (nombre.toLowerCase() === "error") {
      this.#cerrarModal();
      this._mostrarModalError = true;
      return;
    }
    
    let updatedMeses, detail;
    if (this._mesEditando) {
      updatedMeses = this.meses.map(m => m.id === this._mesEditando.id ? { ...m, nombreMes: nombre } : m);
      detail = { tipo: "editado", mes: { ...this._mesEditando, nombreMes: nombre } };
      this._tituloModalExito = "¡Operación Exitosa!";
      this._mensajeModalExito = `El mes de ${nombre} se ha\nactualizado correctamente.`;
    } else {
      const newId = Math.max(0, ...this.meses.map(m => m.id)) + 1;
      const nuevoMes = { id: newId, nombreMes: nombre };
      updatedMeses = [...this.meses, nuevoMes];
      detail = { tipo: "agregado", mes: nuevoMes };
      this._tituloModalExito = "¡Operación Exitosa!";
      this._mensajeModalExito = `El mes de ${nombre} se ha\nregistrado correctamente.`;
    }
    this.meses = updatedMeses;
    this.#cerrarModal();
    this.#dispatch("meses-actualizados", this.meses);
    this.#dispatch("mes-" + detail.tipo, detail.mes);
    
    this._mostrarModalExito = true;
  }

  #eliminar(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const mes = this.meses.find(m => m.id === id);
    const nombre = mes ? mes.nombreMes : '';
    
    if (this._mesActualId === id) this._mesActualId = null;
    this.meses = this.meses.filter(m => m.id !== id);
    this.#dispatch("meses-actualizados", this.meses);
    this.#dispatch("mes-eliminado-id", id);
    
    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Operación Exitosa!";
    this._mensajeModalExito = `El mes de ${nombre} se ha\neliminado correctamente.`;
    this._mostrarModalExito = true;
  }

  #dispatch(event, detail) {
    this.dispatchEvent(new CustomEvent(event, { bubbles: true, composed: true, detail }));
  }

  #dragStart(e, index) {
    this._draggedIndex = index;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => this.requestUpdate(), 0);
  }

  #dragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (this._dragOverIndex !== index) {
      this._dragOverIndex = index;
    }
  }

  #dragLeave(e) {
    e.preventDefault();
  }

  #drop(e, index) {
    e.preventDefault();
    if (this._draggedIndex === null || this._draggedIndex === index) {
      this._dragOverIndex = null;
      return;
    }
    
    const newMeses = [...this.meses];
    const [draggedItem] = newMeses.splice(this._draggedIndex, 1);
    newMeses.splice(index, 0, draggedItem);
    
    this.meses = newMeses;
    this.#dispatch("meses-actualizados", this.meses);
    
    this._draggedIndex = null;
    this._dragOverIndex = null;
  }

  #dragEnd() {
    this._draggedIndex = null;
    this._dragOverIndex = null;
  }

  #renderCard(mes, index) {
    const isDragging = this._draggedIndex === index;
    const isDragOver = this._dragOverIndex === index;

    return html`
      <div 
        class="mes-card ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}"
        draggable="true"
        @dragstart="${(e) => this.#dragStart(e, index)}"
        @dragover="${(e) => this.#dragOver(e, index)}"
        @dragleave="${this.#dragLeave}"
        @drop="${(e) => this.#drop(e, index)}"
        @dragend="${this.#dragEnd}"
      >
        <span class="card-name">${mes.nombreMes}</span>
        <div class="card-actions">
          <button class="btn-edit" title="Editar" @click="${() => this.#abrirModal(mes)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn-delete" title="Eliminar" @click="${() => this.#eliminar(mes.id)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>`;
  }

  get #renderModal() {
    if (!this._modalAbierto) return "";
    const esEdicion = !!this._mesEditando;
    return html`
      <div class="overlay" @click="${(e) => e.target === e.currentTarget && this.#cerrarModal()}">
        <div class="modal">
          <div class="modal-header">
            <h3>${esEdicion ? "Editar Mes" : "Añadir Nuevo Mes"}</h3>
            <button class="btn-close" @click="${this.#cerrarModal}">×</button>
          </div>
          <div class="form-group">
            <label>Nombre del Mes</label>
            <input type="text" class="${this._inputError ? "input-error" : ""}" placeholder="Ej. Enero"
              .value="${this._nombreInput}"
              @input="${e => { this._nombreInput = e.target.value; this._inputError = ""; }}"
              @keydown="${e => e.key === "Enter" && this.#guardar()}"/>
            ${this._inputError ? html`<div class="error-text">${this._inputError}</div>` : ""}
          </div>
          <div class="modal-actions">
            <button class="btn-cancel" @click="${this.#cerrarModal}">Cancelar</button>
            <button class="btn-save" @click="${this.#guardar}">${esEdicion ? "Guardar Cambios" : "Agregar Mes"}</button>
          </div>
        </div>
      </div>`;
  }

  render() {
    const mesesParaMostrar = [...this.meses];
    return html`
      <div class="layout">
        <!-- Left Global Sidebar mimicking LendorP -->
        <sidebar-menu activeMenu="mes"></sidebar-menu>

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
                <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#E2E8F0"/>
              </svg>
            </div>
          </div>
          <div class="page-header">
            <div class="page-header-text">
              <h1>${this.titulo}</h1>
              <p>Define los períodos operativos y el mes actual de ejecución.</p>
            </div>
          </div>
          <div class="banner">
            <div class="banner-label">ESTADO DEL SISTEMA</div>
            <h2>Mes de Operación Actual</h2>
            <p>Este mes determina los calculos de presupuestos, proyecciones y vencimientos en todo el ecosistema Lendora.</p>
          </div>
          <div class="cards-grid">
            ${mesesParaMostrar.length === 0
              ? html``
              : mesesParaMostrar.map((m, idx) => this.#renderCard(m, idx))}
            <div class="add-card" @click="${() => this.#abrirModal()}">
              <div class="plus">+</div>
              <span>Añadir Nuevo Mes</span>
            </div>
          </div>
        </div>
      </div>
      ${this.#renderModal}
      <modal-exito
        ?abierto="${this._mostrarModalExito}"
        .titulo="${this._tituloModalExito}"
        .mensaje="${this._mensajeModalExito}"
        @modal-exito-cerrado="${() => this._mostrarModalExito = false}">
      </modal-exito>
      <modal-error
        ?abierto="${this._mostrarModalError}"
        @modal-error-cerrado="${() => this._mostrarModalError = false}"
        @modal-error-reintentar="${() => { this._mostrarModalError = false; this._modalAbierto = true; }}">
      </modal-error>
      <modal-confirmacion
        ?abierto="${this._mostrarModalConfirmacion}"
        @modal-confirmacion-cancelar="${() => { this._mostrarModalConfirmacion = false; this._itemAEliminar = null; }}"
        @modal-confirmacion-eliminar="${this.#confirmarEliminacion}">
      </modal-confirmacion>`;
  }
}

customElements.define("tabla-mes", TablaMes);
