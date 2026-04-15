import { LitElement, html, nothing } from "lit";
import { modalTipoGastoStyles } from "./modalAgregarTipoGasto.styles.js";

export class ModalAgregarTipoGasto extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    tipoGastoEditando: { type: Object },
    _iconoSeleccionado: { type: String, state: true },
  };

  static styles = [modalTipoGastoStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nuevo Tipo de Gasto";
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
    this._iconoSeleccionado = 'general';
  }

  get icons() {
    return [
      { id: 'general', name: 'Gral', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>` },
      { id: 'building', name: 'Casa', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3Z"/><path d="M9 17h1"/><path d="M14 17h1"/><path d="M9 13h1"/><path d="M14 13h1"/><path d="M19 7v14H5V7"/></svg>` },
      { id: 'bolt', name: 'Luz', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>` },
      { id: 'cloud', name: 'Web', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.315-1.433-4.293-3.454-5.087C19.294 4.545 16.037 2 12.16 2 9.074 2 6.377 3.518 4.774 5.86 2.057 6.448 0 8.87 0 11.75 0 15.195 2.805 18 6.25 18h11.25"/></svg>` },
      { id: 'shopping-cart', name: 'Súper', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>` },
      { id: 'car', name: 'Auto', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>` },
      { id: 'coffee', name: 'Ocio', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>` },
      { id: 'heart', name: 'Salud', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>` },
      { id: 'briefcase', name: 'Work', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
      { id: 'credit-card', name: 'Pago', svg: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` }
    ];
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Tipo de Gasto" : "Agregar Nuevo Tipo de Gasto";
    return html`
      <div class="modal-header">
        <h2>${titulo}</h2>
        <button class="btn-cerrar" @click="${this.#cerrarModal}">×</button>
      </div>
    `;
  }

  get #renderBotones() {
    return html`
      <div class="modal-footer">
        <button
          type="button"
          @click="${this.#cerrarModal}"
          class="btn btn-secundario"
        >
          Cancelar
        </button>
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Tipo de Gasto'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre del tipo de gasto:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Alimentos, Transporte, Servicios"
            .value="${this.tipoGastoEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label>Icono representativo:</label>
          <div class="icon-grid">
            ${this.icons.map(icon => html`
              <div 
                class="icon-option ${this._iconoSeleccionado === icon.id ? 'active' : ''}"
                @click="${() => this._iconoSeleccionado = icon.id}"
                title="${icon.name}"
              >
                ${icon.svg}
                <span>${icon.name}</span>
              </div>
            `)}
          </div>
        </div>

        ${this.#renderBotones}
      </form>
    `;
  }

  render() {
    if (!this.abierto) return nothing;

    return html`
      <div class="modal-overlay" @click="${this.#cerrarModal}">
        <div class="modal-content" @click="${this.#evitarCierre}">
          ${this.#renderHeader} ${this.#renderForm}
        </div>
      </div>
    `;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }

  #evitarCierre(e) {
    e.stopPropagation();
  }

  #enviarFormulario(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const tipoGasto = {
      id: this.modoEdicion ? this.tipoGastoEditando.id : Date.now(),
      nombre: formData.get("nombre"),
      icono: this._iconoSeleccionado,
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("tipo-gasto-editado", {
          detail: tipoGasto,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("tipo-gasto-agregado", {
          detail: tipoGasto,
        })
      );
    }

    // Limpiar formulario y cerrar modal
    e.target.reset();
    this.#cerrarModal();
  }

  // Método público para abrir el modal
  abrir() {
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
    this._iconoSeleccionado = 'general';
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
    this._iconoSeleccionado = 'general';
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(tipoGasto) {
    this.modoEdicion = true;
    this.tipoGastoEditando = { ...tipoGasto };
    this._iconoSeleccionado = tipoGasto.icono || 'general';
    this.abierto = true;
  }
}

customElements.define("modal-agregar-tipo-gasto", ModalAgregarTipoGasto);

