import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarTarjeta.styles.js";

export class ModalAgregarTarjeta extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nueva Tarjeta";
  }

  get #renderHeader() {
    return html`
      <div class="modal-header">
        <h2>${this.titulo}</h2>
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
        <button type="submit" class="btn btn-primario">Agregar Tarjeta</button>
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
          />
        </div>

        <div class="campo">
          <label for="diaCorte">Día de corte:</label>
          <select id="diaCorte" name="diaCorte" required>
            <option value="">Seleccionar día</option>
            ${Array.from({ length: 31 }, (_, i) => {
              const dia = i + 1;
              return html`<option value="${dia}">${dia}</option>`;
            })}
          </select>
        </div>

        <div class="campo">
          <label for="diaPago">Día de pago:</label>
          <select id="diaPago" name="diaPago" required>
            <option value="">Seleccionar día</option>
            ${Array.from({ length: 31 }, (_, i) => {
              const dia = i + 1;
              return html`<option value="${dia}">${dia}</option>`;
            })}
          </select>
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
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }

  #evitarCierre(e) {
    e.stopPropagation();
  }

  #enviarFormulario(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevaTarjeta = {
      nombre: formData.get("nombre"),
      diaCorte: parseInt(formData.get("diaCorte")),
      diaPago: parseInt(formData.get("diaPago")),
    };

    // Emitir evento con los datos
    this.dispatchEvent(
      new CustomEvent("tarjeta-agregada", {
        detail: nuevaTarjeta,
      })
    );

    // Limpiar formulario y cerrar modal
    e.target.reset();
    this.#cerrarModal();
  }

  // Método público para abrir el modal
  abrir() {
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
  }
}

customElements.define("modal-agregar-tarjeta", ModalAgregarTarjeta);
