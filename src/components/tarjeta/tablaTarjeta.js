import { LitElement, html } from 'lit';
import { tablaTarjetaStyles } from './tablaTarjeta.styles.js';
import './modals/modalAgregarTarjeta.js';


export class TablaTarjeta extends LitElement {
  static properties = {
    titulo: { type: String },
    tarjetas: { type: Array },
    cargando: { type: Boolean },
    locale: { type: String }
  };

  static styles = [tablaTarjetaStyles];

  constructor() {
    super();
    this.titulo = 'Tarjetas';
    this.tarjetas = [];
    this.cargando = false;
    this.locale = 'es-MX';
  }
  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: 4 }).map(() => html`
            <tr>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:100%;"></div></td>
              <td><div class="skeleton" style="width:100%;"></div></td>
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
          </tr>
        </thead>
        <tbody>
          ${this.tarjetas.map(t => html`
            <tr>
              <td>${t.nombre ?? ''}</td>
              <td>${t.diaCorte ?? ''}</td>
              <td>${t.diaPago ?? ''}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }


 
  #abrirModal() {
    const modal = this.shadowRoot.querySelector('modal-agregar-tarjeta');
    if (modal) {
      modal.abrir();
    }
  }

  #manejarTarjetaAgregada(e) {
    const nuevaTarjeta = e.detail;
    this.tarjetas = [...this.tarjetas, nuevaTarjeta];
    console.log(this.tarjetas);
    
    // Emitir evento para que el componente padre sepa del cambio
    this.dispatchEvent(new CustomEvent('tarjetas-actualizadas', {
      detail: this.tarjetas
    }));
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalTarjeta() {
    return html`
      <modal-agregar-tarjeta 
        @tarjeta-agregada="${this.#manejarTarjetaAgregada}"
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