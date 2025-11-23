import { LitElement, html, nothing } from "lit";
import { modalStyles } from "./modalAgregarIngreso.styles.js";

export class ModalAgregarIngreso extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    modoEdicion: { type: Boolean },
    ingresoEditando: { type: Object },
    quincenas: { type: Array },
    periodicidades: { type: Array },
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Agregar Nuevo Ingreso";
    this.modoEdicion = false;
    this.ingresoEditando = null;
    this.quincenas = [];
    this.periodicidades = [];
  }

  get #renderHeader() {
    const titulo = this.modoEdicion ? "Editar Ingreso" : "Agregar Nuevo Ingreso";
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
        <button type="submit" class="btn btn-primario">${this.modoEdicion ? 'Guardar Cambios' : 'Agregar Ingreso'}</button>
      </div>
    `;
  }

  get #renderForm() {
    return html`
      <form @submit="${this.#enviarFormulario}" class="modal-body">
        <div class="campo">
          <label for="nombre">Nombre del ingreso:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej: Salario, Freelance"
            .value="${this.ingresoEditando?.nombre || ''}"
          />
        </div>

        <div class="campo">
          <label for="monto">Monto:</label>
          <input
            type="number"
            id="monto"
            name="monto"
            required
            min="0"
            step="0.01"
            placeholder="Ej: 15000"
            .value="${this.ingresoEditando?.monto || ''}"
          />
        </div>

        <div class="campo">
          <label for="quincena">Quincena:</label>
          <select id="quincena" name="quincena" required>
            <option value="">Seleccionar quincena</option>
            ${this.quincenas.map(q => {
              const selected = this.ingresoEditando?.quincena?.id === q.id ? 'selected' : '';
              return html`<option value="${q.id}" ${selected}>${q.nombre}</option>`;
            })}
          </select>
        </div>

        <div class="campo">
          <label for="periodicidad">Periodicidad:</label>
          <select id="periodicidad" name="periodicidad" required>
            <option value="">Seleccionar periodicidad</option>
            ${this.periodicidades.map(p => {
              if(p.activo) {
                const selected = this.ingresoEditando?.periodicidad?.id === p.id ? 'selected' : '';
                return html`<option value="${p.id}" ${selected}>${p.nombre}</option>`;
              }
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
    const quincenaId = parseInt(formData.get("quincena"));
    const periodicidadId = parseInt(formData.get("periodicidad"));
    
    const quincenaSeleccionada = this.quincenas.find(q => q.id === quincenaId);
    const periodicidadSeleccionada = this.periodicidades.find(p => p.id === periodicidadId);

    const ingreso = {
      id: this.modoEdicion ? this.ingresoEditando.id : Date.now(),
      nombre: formData.get("nombre"),
      monto: parseFloat(formData.get("monto")),
      quincena: quincenaSeleccionada,
      periodicidad: periodicidadSeleccionada,
    };

    // Emitir evento según el modo
    if (this.modoEdicion) {
      this.dispatchEvent(
        new CustomEvent("ingreso-editado", {
          detail: ingreso,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("ingreso-agregado", {
          detail: ingreso,
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
    this.ingresoEditando = null;
    this.abierto = true;
  }

  // Método público para cerrar el modal
  cerrar() {
    this.abierto = false;
    this.modoEdicion = false;
    this.ingresoEditando = null;
  }

  // Método público para abrir el modal en modo edición
  abrirParaEditar(ingreso) {
    this.modoEdicion = true;
    this.ingresoEditando = { ...ingreso };
    this.abierto = true;
  }

  #cerrarModal() {
    this.abierto = false;
    this.modoEdicion = false;
    this.ingresoEditando = null;
    this.dispatchEvent(new CustomEvent("modal-cerrado"));
  }
}

customElements.define("modal-agregar-ingreso", ModalAgregarIngreso);

