import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarPersona.styles.js";

export class ModalAgregarPersona extends LitElement {
    static properties = {
        abierto: { type: Boolean },
        titulo: { type: String },
        modoEdicion: { type: Boolean },
        personaEditando: { type: Object },
    };

    static styles = [modalStyles];

    constructor() {
        super();
        this.abierto = false;
        this.titulo = "Agregar Nueva Persona";
        this.modoEdicion = false;
        this.personaEditando = null;
    }

    get #renderHeader() {
        const titulo = this.modoEdicion ? "Editar Persona" : "Agregar Nueva Persona";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Persona'}</button>
      </div>
    `;
    }

    get #renderForm() {
        return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Juan"
            .value="${this.personaEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label for="apellidoPaterno">Apellido Paterno:</label>
          <input
            type="text"
            id="apellidoPaterno"
            name="apellidoPaterno"
            required
            placeholder="Ej: García"
            .value="${this.personaEditando?.apellidoPaterno || ''}"
          />
        </div>

        <div class="campo">
          <label for="apellidoMaterno">Apellido Materno:</label>
          <input
            type="text"
            id="apellidoMaterno"
            name="apellidoMaterno"
            required
            placeholder="Ej: López"
            .value="${this.personaEditando?.apellidoMaterno || ''}"
          />
        </div>

        <div class="campo">
          <label for="alias">Alias:</label>
          <input
            type="text"
            id="alias"
            name="alias"
            required
            placeholder="Ej: Juanito"
            .value="${this.personaEditando?.alias || ''}"
          />
        </div>

        ${this.#renderBotones}
      </form>
    `;
    }

    #evitarCierre(e) {
        e.stopPropagation();
    }

    #enviarFormulario(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const persona = {
            id: this.modoEdicion ? this.personaEditando.id : Date.now(),
            nombre: formData.get("nombre"),
            apellidoPaterno: formData.get("apellidoPaterno"),
            apellidoMaterno: formData.get("apellidoMaterno"),
            alias: formData.get("alias"),
        };

        if (this.modoEdicion) {
            this.dispatchEvent(
                new CustomEvent("persona-editada", {
                    detail: persona,
                })
            );
        } else {
            this.dispatchEvent(
                new CustomEvent("persona-agregada", {
                    detail: persona,
                })
            );
        }

        // Limpiar formulario y cerrar modal
        e.target.reset();
        this.#cerrarModal();
    }

    // Método público para abrir el modal
    abrir() {
        // Resetear todo el estado primero
        this.modoEdicion = false;
        this.personaEditando = null;
        // Luego abrir
        this.abierto = true;
        this.requestUpdate();
    }

    // Método público para cerrar el modal
    cerrar() {
        this.abierto = false;
        this.modoEdicion = false;
        this.personaEditando = null;
    }

    // Método público para abrir el modal en modo edición
    abrirParaEditar(persona) {
        // Establecer el estado de edición
        this.modoEdicion = true;
        this.personaEditando = { ...persona };
        // Luego abrir
        this.abierto = true;
        this.requestUpdate();
    }

    #cerrarModal() {
        // Resetear todo el estado al cerrar
        this.abierto = false;
        this.modoEdicion = false;
        this.personaEditando = null;
        this.dispatchEvent(new CustomEvent("modal-cerrado"));
        this.requestUpdate();
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
}

customElements.define("modal-agregar-persona", ModalAgregarPersona);
