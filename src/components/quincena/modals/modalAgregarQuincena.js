import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarQuincena.styles.js";

export class ModalAgregarQuincena extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    quincenaEditando: { type: Object },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nueva Quincena";
    this.modoEdicion = false;
    this.quincenaEditando = null;
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Quincena" : "Agregar Nueva Quincena";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Quincena'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre de la quincena:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Primera Quincena"
            .value="${this.quincenaEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label for="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            .value="${this.quincenaEditando?.fecha || ''}"
          />
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


  #evitarCierre(e) {
    e.stopPropagation();
  }

  #enviarFormulario(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const quincena = {
      id: this.modoEdicion ? this.quincenaEditando.id : Date.now(),
      nombre: formData.get("nombre"),
      fecha: formData.get("fecha"),
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("quincena-editada", {
          detail: quincena,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("quincena-agregada", {
          detail: quincena,
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
    this.quincenaEditando = null;
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.quincenaEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(quincena) {
    this.modoEdicion = true;
    this.quincenaEditando = { ...quincena };
    this.abierto = true;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.quincenaEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }
}

customElements.define("modal-agregar-quincena", ModalAgregarQuincena);

