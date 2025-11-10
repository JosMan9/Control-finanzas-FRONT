import { LitElement, html, nothing } from "lit";
import { modalTipoGastoStyles } from "./modalAgregarTipoGasto.styles.js";

export class ModalAgregarTipoGasto extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    tipoGastoEditando: { type: Object },
  };

  static styles = [modalTipoGastoStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nuevo Tipo de Gasto";
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
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
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.tipoGastoEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(tipoGasto) {
    this.modoEdicion = true;
    this.tipoGastoEditando = { ...tipoGasto };
    this.abierto = true;
  }
}

customElements.define("modal-agregar-tipo-gasto", ModalAgregarTipoGasto);

