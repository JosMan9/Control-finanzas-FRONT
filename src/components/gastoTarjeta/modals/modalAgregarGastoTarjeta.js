import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarGastoTarjeta.styles.js";

export class ModalAgregarGastoTarjeta extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    gastoTarjetaEditando: { type: Object },
    tarjetas: { type: Array },
    gastos: { type: Array },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nuevo Gasto Tarjeta";
    this.modoEdicion = false;
    this.gastoTarjetaEditando = null;
    this.tarjetas = [];
    this.gastos = [];
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Gasto Tarjeta" : "Agregar Nuevo Gasto Tarjeta";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Gasto Tarjeta'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="mesActual">Mes Actual:</label>
          <input
            type="number"
            id="mesActual"
            name="mesActual"
            required
            min="1"
            max="20"
            placeholder="Ej: 1"
            .value="${this.gastoTarjetaEditando?.mesActual || ''}"
          />
        </div>

        <div class="campo">
          <label for="mesFinal">Mes Final:</label>
          <input
            type="number"
            id="mesFinal"
            name="mesFinal"
            required
            min="1"
            max="20"
            placeholder="Ej: 2"
            .value="${this.gastoTarjetaEditando?.mesFinal || ''}"
          />
        </div>

        <div class="campo">
          <label for="tarjeta">Tarjeta:</label>
          <select id="tarjeta" name="tarjeta" required>
            <option value="">Seleccionar tarjeta</option>
            ${this.tarjetas.map(t => {
              const selected = this.gastoTarjetaEditando?.tarjeta?.id === t.id ? 'selected' : '';
              return html`<option value="${t.id}" ${selected}>${t.nombre}</option>`;
            })}
          </select>
        </div>

        <div class="campo campo-checkbox">
          <input
            type="checkbox"
            id="esMio"
            name="esMio"
            .checked="${this.gastoTarjetaEditando?.esMio || false}"
          />
          <label for="esMio">¿Es mío?</label>
        </div>

        <div class="campo">
          <label for="cantidadAbonada">Cantidad Abonada:</label>
          <input
            type="number"
            id="cantidadAbonada"
            name="cantidadAbonada"
            required
            min="0"
            step="0.01"
            placeholder="Ej: 1500.00"
            .value="${this.gastoTarjetaEditando?.cantidadAbonada || ''}"
          />
        </div>

        <div class="campo">
          <label for="gasto">Gasto:</label>
          <select id="gasto" name="gasto" required>
            <option value="">Seleccionar gasto</option>
            ${this.gastos.map(g => {
              const selected = this.gastoTarjetaEditando?.gasto?.id === g.id ? 'selected' : '';
              return html`<option value="${g.id}" ${selected}>${g.concepto}</option>`;
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


  #evitarCierre(e) {
    e.stopPropagation();
  }

  #enviarFormulario(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const tarjetaId = parseInt(formData.get("tarjeta"));
    const gastoId = parseInt(formData.get("gasto"));
    const esMio = formData.get("esMio") === 'on';
    
    const tarjetaSeleccionada = this.tarjetas.find(t => t.id === tarjetaId);
    const gastoSeleccionado = this.gastos.find(g => g.id === gastoId);

    const gastoTarjeta = {
      id: this.modoEdicion ? this.gastoTarjetaEditando.id : Date.now(),
      mesActual: parseInt(formData.get("mesActual")),
      mesFinal: parseInt(formData.get("mesFinal")),
      tarjeta: tarjetaSeleccionada,
      esMio: esMio,
      cantidadAbonada: parseFloat(formData.get("cantidadAbonada")),
      gasto: gastoSeleccionado,
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("gasto-tarjeta-editado", {
          detail: gastoTarjeta,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("gasto-tarjeta-agregado", {
          detail: gastoTarjeta,
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
    this.gastoTarjetaEditando = null;
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.gastoTarjetaEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(gastoTarjeta) {
    this.modoEdicion = true;
    this.gastoTarjetaEditando = { ...gastoTarjeta };
    this.abierto = true;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.gastoTarjetaEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }
}

customElements.define("modal-agregar-gasto-tarjeta", ModalAgregarGastoTarjeta);

