import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarGasto.styles.js";

export class ModalAgregarGasto extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    gastoEditando: { type: Object },
    ingresos: { type: Array },
    tipoGastos: { type: Array },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nuevo Gasto";
    this.modoEdicion = false;
    this.gastoEditando = null;
    this.ingresos = [];
    this.tipoGastos = [];
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Gasto" : "Agregar Nuevo Gasto";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Gasto'}</button>
      </div>
    `;
  }

  get #renderForm() {
    // Formatear fecha para el input date (YYYY-MM-DD)
    const fechaValue = this.gastoEditando?.fechaOperacion || '';
    
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="concepto">Concepto:</label>
          <input
            type="text"
            id="concepto"
            name="concepto"
            required
            placeholder="Ej: Compra de supermercado"
            .value="${this.gastoEditando?.concepto || ''}"
          />
        </div>

        <div class="campo">
          <label for="monto">Monto:</label>
          <input
            type="number"
            id="monto"
            name="monto"
            required
            step="0.01"
            placeholder="Ej: 1500.00"
            .value="${this.gastoEditando?.monto || ''}"
          />
        </div>

        <div class="campo">
          <label for="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            .value="${fechaValue}"
          />
        </div>

        <div class="campo">
          <label for="ingreso">Ingreso:</label>
          <select id="ingreso" name="ingreso" required>
            <option value="">Seleccionar ingreso</option>
            ${this.ingresos.map(i => {
              const selected = this.gastoEditando?.ingreso?.id === i.id ? 'selected' : '';
              return html`<option value="${i.id}" ${selected}>${i.nombre}</option>`;
            })}
          </select>
        </div>

        <div class="campo">
          <label for="tipoGasto">Tipo de Gasto:</label>
          <select id="tipoGasto" name="tipoGasto" required>
            <option value="">Seleccionar tipo de gasto</option>
            ${this.tipoGastos.map(tg => {
              const selected = this.gastoEditando?.tipoGasto?.id === tg.id ? 'selected' : '';
              return html`<option value="${tg.id}" ${selected}>${tg.nombre}</option>`;
            })}
          </select>
        </div>

        <div class="campo campo-checkbox">
          <input
            type="checkbox"
            id="esCubierto"
            name="esCubierto"
            .checked="${this.gastoEditando?.esCubierto || false}"
          />
          <label for="esCubierto">¿Está cubierto?</label>
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
    const ingresoId = parseInt(formData.get("ingreso"));
    const tipoGastoId = parseInt(formData.get("tipoGasto"));
    const esCubierto = formData.get("esCubierto") === 'on';
    
    const ingresoSeleccionado = this.ingresos.find(i => i.id === ingresoId);
    const tipoGastoSeleccionado = this.tipoGastos.find(tg => tg.id === tipoGastoId);

    const gasto = {
      id: this.modoEdicion ? this.gastoEditando.id : Date.now(),
      concepto: formData.get("concepto"),
      monto: parseFloat(formData.get("monto")),
      fechaOperacion: formData.get("fecha"),
      esCubierto: esCubierto,
      ingreso: ingresoSeleccionado,
      tipoGasto: tipoGastoSeleccionado,
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("gasto-editado", {
          detail: gasto,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("gasto-agregado", {
          detail: gasto,
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
    this.gastoEditando = null;
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.gastoEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(gasto) {
    this.modoEdicion = true;
    this.gastoEditando = { ...gasto };
    this.abierto = true;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.gastoEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }
}

customElements.define("modal-agregar-gasto", ModalAgregarGasto);

