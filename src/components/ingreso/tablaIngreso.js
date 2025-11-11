import { LitElement, html } from 'lit';
import { tablaIngresoStyles } from './tablaIngreso.styles.js';
import './modals/modalAgregarIngreso.js';


export class TablaIngreso extends LitElement {
  static properties = {
    titulo: { type: String },
    ingresos: { type: Array },
    quincenas: { type: Array },
    periodicidades: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaIngresoStyles];

  constructor() {
    super();
    this.titulo = 'Ingresos';
    this.ingresos = [];
    this.quincenas = [];
    this.periodicidades = [];
    this.cargando = false;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:80px;"></span></th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: 4 }).map(() => html`
            <tr>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:60px;"></div></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  get #renderTabla() {
    if (!this.ingresos?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
            <th>Quincena</th>
            <th>Periodicidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.ingresos.map(i => html`
            <tr>
              <td>${i.nombre ?? ''}</td>
              <td>$${i.monto?.toLocaleString('es-MX') ?? '0'}</td>
              <td>${i.quincena?.nombre ?? 'N/A'}</td>
              <td>${i.periodicidad?.nombre ?? 'N/A'}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarIngreso(i)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarIngreso(i.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(ingreso = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-ingreso');
    if (modal) {
      if (typeof ingreso.detail === 'number' ) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(ingreso);
      }
    }
  }

  #editarIngreso(ingreso) {
    this.#abrirModal(ingreso);
  }

  #eliminarIngreso(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este ingreso?')) {
      this.ingresos = this.ingresos.filter(i => i.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
        detail: this.ingresos
      }));
    }
  }

  #manejarIngresoAgregado(e) {
    const nuevoIngreso = e.detail;
    const existe = this.ingresos.find(i => i.id === nuevoIngreso.id);
    if (existe) {
      return;
    }

    if (!nuevoIngreso.id) {
      nuevoIngreso.id = Date.now();
    }
    this.ingresos = [...this.ingresos, nuevoIngreso];
    this.requestUpdate();
    console.log('Ingreso agregado:', nuevoIngreso);

    this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
      detail: this.ingresos
    }));
  }

  #manejarIngresoEditado(e) {
    const ingresoEditado = e.detail;
    const index = this.ingresos.findIndex(i => i.id === ingresoEditado.id);
    if (index !== -1) {
      this.ingresos = [
        ...this.ingresos.slice(0, index),
        ingresoEditado,
        ...this.ingresos.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Ingreso editado:', ingresoEditado);

      this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
        detail: this.ingresos
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalIngreso() {
    return html`
      <modal-agregar-ingreso
        .quincenas="${this.quincenas}"
        .periodicidades="${this.periodicidades}"
        @ingreso-agregado="${this.#manejarIngresoAgregado}"
        @ingreso-editado="${this.#manejarIngresoEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-ingreso>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Ingreso
          </button>
          <slot name="acciones"></slot>
        </div>
      </div>
    `;
  }


  render() {
    return html`
      ${this.#renderHeader}
      ${this.cargando
        ? this.#renderSkeleton
        : this.#renderTabla}
    ${this.#renderModalIngreso}
    `;
  }

}

customElements.define('tabla-ingreso', TablaIngreso);

