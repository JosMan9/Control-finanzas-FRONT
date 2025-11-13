import { LitElement, html } from 'lit';
import { tablaGastoStyles } from './tablaGasto.styles.js';
import './modals/modalAgregarGasto.js';


export class TablaGasto extends LitElement {
  static properties = {
    titulo: { type: String },
    gastos: { type: Array },
    ingresos: { type: Array },
    tipoGastos: { type: Array },
    quincenas: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaGastoStyles];

  constructor() {
    super();
    this.titulo = 'Gastos';
    this.gastos = [];
    this.ingresos = [];
    this.tipoGastos = [];
    this.quincenas = [];
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
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
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
    if (!this.gastos?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Fecha</th>
            <th>Ingreso</th>
            <th>Tipo de Gasto</th>
            <th>Quincena</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.gastos.map(g => html`
            <tr>
              <td>${g.concepto ?? ''}</td>
              <td>${g.fecha ?? 'N/A'}</td>
              <td>${g.ingreso?.nombre ?? 'N/A'}</td>
              <td>${g.tipoGasto?.nombre ?? 'N/A'}</td>
              <td>${g.quincena?.nombre ?? 'N/A'}</td>
              <td>
                <span class="badge ${g.esCubierto ? 'badge-cubierto' : 'badge-no-cubierto'}">
                  ${g.esCubierto ? 'Cubierto' : 'No Cubierto'}
                </span>
              </td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarGasto(g)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarGasto(g.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(gasto = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-gasto');
    if (modal) {
      if (typeof gasto === 'number' || !gasto) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(gasto);
      }
    }
  }

  #editarGasto(gasto) {
    this.#abrirModal(gasto);
  }

  #eliminarGasto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      this.gastos = this.gastos.filter(g => g.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('gastos-actualizados', {
        detail: this.gastos
      }));
    }
  }

  #manejarGastoAgregado(e) {
    const nuevoGasto = e.detail;
    const existe = this.gastos.find(g => g.id === nuevoGasto.id);
    if (existe) {
      return;
    }

    if (!nuevoGasto.id) {
      nuevoGasto.id = Date.now();
    }
    this.gastos = [...this.gastos, nuevoGasto];
    this.requestUpdate();
    console.log('Gasto agregado:', nuevoGasto);

    this.dispatchEvent(new CustomEvent('gastos-actualizados', {
      detail: this.gastos
    }));
  }

  #manejarGastoEditado(e) {
    const gastoEditado = e.detail;
    const index = this.gastos.findIndex(g => g.id === gastoEditado.id);
    if (index !== -1) {
      this.gastos = [
        ...this.gastos.slice(0, index),
        gastoEditado,
        ...this.gastos.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Gasto editado:', gastoEditado);

      this.dispatchEvent(new CustomEvent('gastos-actualizados', {
        detail: this.gastos
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalGasto() {
    return html`
      <modal-agregar-gasto
        .ingresos="${this.ingresos}"
        .tipoGastos="${this.tipoGastos}"
        .quincenas="${this.quincenas}"
        @gasto-agregado="${this.#manejarGastoAgregado}"
        @gasto-editado="${this.#manejarGastoEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-gasto>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Gasto
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
    ${this.#renderModalGasto}
    `;
  }

}

customElements.define('tabla-gasto', TablaGasto);

