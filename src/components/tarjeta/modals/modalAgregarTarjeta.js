import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarTarjeta.styles.js";

export class ModalAgregarTarjeta extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    tarjetaEditando: { type: Object },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nueva Tarjeta";
    this.modoEdicion = false;
    this.tarjetaEditando = null;
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Tarjeta" : "Agregar Nueva Tarjeta";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Tarjeta'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre de la tarjeta:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Visa BBVA"
            .value="${this.tarjetaEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label for="diaCorte">Día de corte:</label>
          <select id="diaCorte" name="diaCorte" required>
            <option value="">Seleccionar día</option>
            ${Array.from({ length: 31 }, (_, i) => {
              const dia = i + 1;
              const selected = this.tarjetaEditando?.diaCorte == dia ? 'selected' : '';
              return html`<option value="${dia}" ${selected}>${dia}</option>`;
            })}
          </select>
        </div>

        <div class="campo">
          <label for="diaPago">Día de pago:</label>
          <select id="diaPago" name="diaPago" required>
            <option value="">Seleccionar día</option>
            ${Array.from({ length: 31 }, (_, i) => {
              const dia = i + 1;
              const selected = this.tarjetaEditando?.diaPago == dia ? 'selected' : '';
              return html`<option value="${dia}" ${selected}>${dia}</option>`;
            })}
          </select>
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
    const tarjeta = {
      id: this.modoEdicion ? this.tarjetaEditando.id : Date.now(),
      nombre: formData.get("nombre"),
      diaCorte: formData.get("diaCorte"),
      diaPago: formData.get("diaPago"),
    };

    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("tarjeta-editada", {
          detail: tarjeta,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("tarjeta-agregada", {
          detail: tarjeta,
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
    this.tarjetaEditando = null;
    // Luego abrir
    this.abierto = true;
    this.requestUpdate();
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.tarjetaEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(tarjeta) {
    // Establecer el estado de edición
    this.modoEdicion = true;
    this.tarjetaEditando = { ...tarjeta };
    // Luego abrir
    this.abierto = true;
    this.requestUpdate();
  }

  #cerrarModal() {
    // Resetear todo el estado al cerrar
    this.abierto = false;
    this.modoEdicion = false;
    this.tarjetaEditando = null;
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

customElements.define("modal-agregar-tarjeta", ModalAgregarTarjeta);
