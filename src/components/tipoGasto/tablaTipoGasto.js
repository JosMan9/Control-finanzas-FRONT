import { LitElement, html } from 'lit';
import { tablaTipoGastoStyles } from './tablaTipoGasto.styles.js';
import './modals/modalAgregarTipoGasto.js';


export class TablaTipoGasto extends LitElement {
  static properties = {
    titulo: { type: String },
    tiposGasto: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaTipoGastoStyles];

  constructor() {
    super();
    this.titulo = 'Tipos de Gasto';
    this.tiposGasto = [];
    this.cargando = false;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:80px;"></span></th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: 4 }).map(() => html`
            <tr>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:60px;"></div></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  get #renderTabla() {
    if (!this.tiposGasto?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.tiposGasto.map(t => html`
            <tr>
              <td>${t.nombre ?? ''}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarTipoGasto(t)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarTipoGasto(t.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(tipoGasto = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-tipo-gasto');
    if (modal) {
      if (tipoGasto) {
        modal.abrirParaEditar(tipoGasto);
      } else {
        modal.abrir();
      }
    }
  }

  #editarTipoGasto(tipoGasto) {
    this.#abrirModal(tipoGasto);
  }

  #eliminarTipoGasto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de gasto?')) {
      this.tiposGasto = this.tiposGasto.filter(t => t.id !== id);

      this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', {
        detail: this.tiposGasto
      }));
    }
  }

  #manejarTipoGastoAgregado(e) {
    const nuevoTipoGasto = e.detail;
    const existe = this.tiposGasto.find(t => t.id === nuevoTipoGasto.id);
    if (existe) {
      return;
    }

    if (!nuevoTipoGasto.id) {
      nuevoTipoGasto.id = Date.now();
    }
    this.tiposGasto = [...this.tiposGasto, nuevoTipoGasto];
    console.log('Tipo de gasto agregado:', nuevoTipoGasto);

    this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', {
      detail: this.tiposGasto
    }));
  }

  #manejarTipoGastoEditado(e) {
    const tipoGastoEditado = e.detail;
    const index = this.tiposGasto.findIndex(t => t.id === tipoGastoEditado.id);
    if (index !== -1) {
      this.tiposGasto = [
        ...this.tiposGasto.slice(0, index),
        tipoGastoEditado,
        ...this.tiposGasto.slice(index + 1)
      ];
      console.log('Tipo de gasto editado:', tipoGastoEditado);

      this.dispatchEvent(new CustomEvent('tipos-gasto-actualizados', {
        detail: this.tiposGasto
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalTipoGasto() {
    return html`
      <modal-agregar-tipo-gasto 
        @tipo-gasto-agregado="${this.#manejarTipoGastoAgregado}"
        @tipo-gasto-editado="${this.#manejarTipoGastoEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-tipo-gasto>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Tipo de Gasto
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
    ${this.#renderModalTipoGasto}
    `;
  }

}

customElements.define('tabla-tipo-gasto', TablaTipoGasto);

