import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarPeriodicidad.styles.js";

export class ModalAgregarPeriodicidad extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    periodicidadEditando: { type: Object },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nueva Periodicidad";
    this.modoEdicion = false;
    this.periodicidadEditando = null;
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Periodicidad" : "Agregar Nueva Periodicidad";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Periodicidad'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre de la periodicidad:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Diario, Semanal"
            .value="${this.periodicidadEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label for="dias">Días:</label>
          <input
            type="number"
            id="dias"
            name="dias"
            required
            min="1"
            placeholder="Ej: 1, 7, 15"
            .value="${this.periodicidadEditando?.dias || ''}"
          />
        </div>

        <div class="campo">
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="activo"
              name="activo"
              .checked="${this.periodicidadEditando?.activo ?? true}"
            />
            <span>Activo</span>
          </label>
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
    const periodicidad = {
      id: this.modoEdicion ? this.periodicidadEditando.id : Date.now(),
      nombre: formData.get("nombre"),
      dias: parseInt(formData.get("dias")),
      activo: formData.get("activo") === "on",
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("periodicidad-editada", {
          detail: periodicidad,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("periodicidad-agregada", {
          detail: periodicidad,
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
    this.periodicidadEditando = null;
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.periodicidadEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(periodicidad) {
    this.modoEdicion = true;
    this.periodicidadEditando = { ...periodicidad };
    this.abierto = true;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.periodicidadEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }
}

customElements.define("modal-agregar-periodicidad", ModalAgregarPeriodicidad);

