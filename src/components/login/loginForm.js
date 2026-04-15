import { LitElement, html } from 'lit';
import { loginFormStyles } from './loginForm.styles.js';

export class LoginForm extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
    mostrarPassword: { type: Boolean },
    cargando: { type: Boolean },
    error: { type: String },
  };

  static styles = loginFormStyles;

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.mostrarPassword = false;
    this.cargando = false;
    this.error = '';
  }

  #handleSubmit(e) {
    e.preventDefault();
    if (!this.email || !this.password) {
      this.error = 'Por favor ingresa tu usuario y contrasena.';
      return;
    }
    this.error = '';
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
      this.dispatchEvent(new CustomEvent('login-submit', {
        bubbles: true, composed: true,
        detail: { email: this.email, password: this.password }
      }));
    }, 1400);
  }

  #togglePassword() { this.mostrarPassword = !this.mostrarPassword; }

  get #eyeIcon() {
    if (this.mostrarPassword) {
      return html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
    }
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <div class="page">
        <div class="logo-area">
          <div class="logo-title">El Taller Financiero</div>
          <div class="logo-subtitle">The Digital Private Bank</div>
        </div>
        <div class="card">
          <div class="card-title">Acceso Patrimonial</div>
          <div class="card-desc">Ingrese sus credenciales para gestionar su capital.</div>
          ${this.error ? html`<div class="error-msg">${this.error}</div>` : ''}
          <form @submit="${this.#handleSubmit}">
            <div class="form-group">
              <label for="login-email">Usuario / Correo</label>
              <div class="input-wrapper">
                <input id="login-email" type="email" placeholder="nombre@ejemplo.com"
                  .value="${this.email}" @input="${e => this.email = e.target.value}" autocomplete="username"/>
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
              </div>
            </div>
            <div class="form-group">
              <div class="label-row">
                <label for="login-password">Contrasena</label>
                <button type="button" class="forgot-link" @click="${() => this.dispatchEvent(new CustomEvent('forgot-password', {bubbles:true,composed:true}))}">Olvidaste tu contrasena?</button>
              </div>
              <div class="input-wrapper">
                <input id="login-password" type="${this.mostrarPassword ? 'text' : 'password'}"
                  placeholder="acccccccc" .value="${this.password}"
                  @input="${e => this.password = e.target.value}" autocomplete="current-password"/>
                <button type="button" class="toggle-password" @click="${this.#togglePassword}">${this.#eyeIcon}</button>
              </div>
            </div>
            <button type="submit" class="btn-submit" id="login-submit-btn" ?disabled="${this.cargando}">
              ${this.cargando ? html`<span class="spinner"></span> Verificando...` : 'Iniciar Sesion'}
            </button>
          </form>
          <div class="card-footer">
            Nuevo en el Atelier?&nbsp;
            <button class="link-btn" @click="${() => this.dispatchEvent(new CustomEvent('abrir-cuenta', {bubbles:true,composed:true}))}">Abrir una Cuenta</button>
          </div>
        </div>
        <div class="security-badges">
          <div class="divider"></div>
          <div class="badges">
            <div class="badge-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div class="badge-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
            <div class="badge-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="corner-brand">
          <div class="corner-icon">🏛</div>
          <div class="corner-text">Excellence is not an act,<br>but a habit.</div>
        </div>
      </div>
    `;
  }
}

customElements.define('login-form', LoginForm);
