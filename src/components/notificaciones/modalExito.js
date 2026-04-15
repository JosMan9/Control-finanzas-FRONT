import { LitElement, html } from 'lit';
import { modalExitoStyles } from './modalExito.styles.js';

export class ModalExito extends LitElement {
  static properties = {
    titulo: { type: String },
    mensaje: { type: String },
    abierto: { type: Boolean, reflect: true },
    textoBoton: { type: String }
  };

  static styles = modalExitoStyles;

  constructor() {
    super();
    this.titulo = "¡Operación Exitosa!";
    this.mensaje = "La información se ha procesado\ncorrectamente.";
    this.abierto = false;
    this.textoBoton = "Entendido";
  }

  abrir() {
    this.abierto = true;
  }

  cerrar() {
    this.abierto = false;
    this.dispatchEvent(new CustomEvent('modal-exito-cerrado', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
      <div class="overlay ${this.abierto ? 'visible' : ''}" @click="${(e) => e.target === e.currentTarget && this.cerrar()}">
        <div class="modal-card">
          <div class="icon-wrapper">
            <div class="icon-bg-skew"></div>
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="icon-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <h2 class="title">${this.titulo}</h2>
          <p class="message">${this.mensaje.split('\n').map((line, i) => html`${line}${i === 0 ? html`<br>` : ''}`)}</p>
          <button class="btn-primary" @click="${this.cerrar}">${this.textoBoton}</button>
          
          <div class="footer-secure">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            LENDORA FINANCIAL SECURE
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-exito', ModalExito);
