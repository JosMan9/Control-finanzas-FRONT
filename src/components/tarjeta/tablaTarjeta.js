import { LitElement, html } from 'lit';
import { tablaTarjetaStyles } from './tablaTarjeta.styles.js';
import './modals/modalAgregarTarjeta.js';


export class TablaTarjeta extends LitElement {
  static properties = {
    titulo: { type: String },
    tarjetas: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaTarjetaStyles];

  constructor() {
    super();
    this.titulo = 'Tarjetas';
    this.tarjetas = [];
    this.cargando = false;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:80px;"></span></th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: 4 }).map(() => html`
            <tr>
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
    if (!this.tarjetas?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Día de corte</th>
            <th>Día de pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.tarjetas.map(t => html`
            <tr>
              <td>${t.nombre ?? ''}</td>
              <td>${t.diaCorte ?? ''}</td>
              <td>${t.diaPago ?? ''}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarTarjeta(t)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarTarjeta(t.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(tarjeta = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-tarjeta');
    if (modal) {
      if (typeof tarjeta.detail === 'number' ) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(tarjeta);
      }
    }
  }

  #editarTarjeta(tarjeta) {
    this.#abrirModal(tarjeta);
  }

  #eliminarTarjeta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
      this.tarjetas = this.tarjetas.filter(t => t.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('tarjetas-actualizadas', {
        detail: this.tarjetas
      }));

      this.dispatchEvent(new CustomEvent('tarjeta-eliminada-id', {
        detail: id
      }));
    }
  }

  #manejarTarjetaAgregada(e) {
    const nuevaTarjeta = e.detail;
    const existe = this.tarjetas.find(t => t.id === nuevaTarjeta.id);
    if (existe) {
      return;
    }

    if (!nuevaTarjeta.id) {
      nuevaTarjeta.id = Date.now();
    }
    this.tarjetas = [...this.tarjetas, nuevaTarjeta];
    this.requestUpdate();
    console.log('Tarjeta agregada:', nuevaTarjeta);

    this.dispatchEvent(new CustomEvent('tarjetas-creadas', {
      detail: this.tarjetas
    }));

    this.dispatchEvent(new CustomEvent('tarjeta-creada', {
      detail: nuevaTarjeta
    }));
  }

  #manejarTarjetaEditada(e) {
    const tarjetaEditada = e.detail;
    const index = this.tarjetas.findIndex(t => t.id === tarjetaEditada.id);
    if (index !== -1) {
      this.tarjetas = [
        ...this.tarjetas.slice(0, index),
        tarjetaEditada,
        ...this.tarjetas.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Tarjeta editada:', tarjetaEditada);

      this.dispatchEvent(new CustomEvent('tarjetas-actualizadas', {
        detail: this.tarjetas
      }));

      this.dispatchEvent(new CustomEvent('tarjeta-actualizada', {
        detail: tarjetaEditada
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalTarjeta() {
    return html`
      <modal-agregar-tarjeta
        @tarjeta-agregada="${this.#manejarTarjetaAgregada}"
        @tarjeta-editada="${this.#manejarTarjetaEditada}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-tarjeta>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Tarjeta
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
    ${this.#renderModalTarjeta}
    `;
  }

}

customElements.define('tabla-tarjeta', TablaTarjeta);