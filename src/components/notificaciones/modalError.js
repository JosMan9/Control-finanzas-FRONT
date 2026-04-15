import { LitElement, html } from 'lit';
import { modalErrorStyles } from './modalError.styles.js';

export class ModalError extends LitElement {
  static properties = {
    titulo: { type: String },
    mensaje: { type: String },
    abierto: { type: Boolean, reflect: true }
  };

  static styles = modalErrorStyles;

  constructor() {
    super();
    this.titulo = "Hubo un error";
    this.mensaje = "No se pudo procesar la solicitud en este\nmomento. Por favor, intenta de nuevo más\ntarde.";
    this.abierto = false;
  }

  abrir() {
    this.abierto = true;
  }

  cerrar() {
    this.abierto = false;
    this.dispatchEvent(new CustomEvent('modal-error-cerrar', {
      bubbles: true,
      composed: true
    }));
  }

  reintentar() {
    this.abierto = false;
    this.dispatchEvent(new CustomEvent('modal-error-reintentar', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <div class="overlay ${this.abierto ? 'visible' : ''}" @click="${(e) => e.target === e.currentTarget && this.cerrar()}">
        <div class="modal-card">
          <div class="icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V10h2v4z"/>
            </svg>
          </div>
          <h2 class="title">${this.titulo}</h2>
          <p class="message">${this.mensaje.split('\n').map((line, i, arr) => html`${line}${i < arr.length - 1 ? html`<br>` : ''}`)}</p>
          <div class="button-group">
            <button class="btn btn-primary" @click="${this.reintentar}">Reintentar</button>
            <button class="btn btn-secondary" @click="${this.cerrar}">Cerrar</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-error', ModalError);
