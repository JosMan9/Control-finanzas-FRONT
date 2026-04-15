import { LitElement, html } from 'lit';
import { modalConfirmacionStyles } from './modalConfirmacion.styles.js';

export class ModalConfirmacion extends LitElement {
  static properties = {
    abierto: { type: Boolean },
    titulo: { type: String },
    mensaje: { type: String }
  };

  static styles = modalConfirmacionStyles;

  constructor() {
    super();
    this.abierto = false;
    this.titulo = "Confirmar eliminación";
    this.mensaje = "¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.";
  }

  #cancelar() {
    this.dispatchEvent(new CustomEvent('modal-confirmacion-cancelar', { bubbles: true, composed: true }));
  }

  #confirmar() {
    this.dispatchEvent(new CustomEvent('modal-confirmacion-eliminar', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="overlay ${this.abierto ? 'visible' : ''}">
        <div class="modal-card">
          <div class="title">${this.titulo}</div>
          <div class="message">${this.mensaje}</div>
          
          <div class="button-group">
            <button class="btn btn-danger" @click="${this.#confirmar}">Eliminar</button>
            <button class="btn btn-cancel" @click="${this.#cancelar}">Cancelar</button>
          </div>

          <div class="footer-text">
            THE FINANCIAL ATELIER • SEGURIDAD
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-confirmacion', ModalConfirmacion);
