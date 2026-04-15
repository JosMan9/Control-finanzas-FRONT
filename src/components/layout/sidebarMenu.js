import { LitElement, html } from 'lit';
import { sidebarMenuStyles } from './sidebarMenu.styles.js';

export class SidebarMenu extends LitElement {
  static properties = {
    activeMenu: { type: String }
  };

  static styles = sidebarMenuStyles;

  render() {
    return html`
      <div class="left-sidebar">
        <div class="logo-container">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Lendora
          </h2>
          <span class="logo-subtitle">Banca Privada Digital</span>
        </div>

        <div class="nav-menu">
          <a class="nav-item ${this.activeMenu === 'gasto' ? 'active' : ''}" href="demo-gasto.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
            Gastos
          </a>
          <a class="nav-item ${this.activeMenu === 'gastoTarjeta' ? 'active' : ''}" href="demo-gasto-tarjeta.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Gastos Tarjeta
          </a>
          <a class="nav-item ${this.activeMenu === 'ingreso' ? 'active' : ''}" href="demo-ingreso.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
            Ingreso
          </a>
          <a class="nav-item ${this.activeMenu === 'prestamo' ? 'active' : ''}" href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h2"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><path d="M11 15H7l-3 3V3"/><path d="M22 11l-3 3h-4"/></svg>
            Prestamo
          </a>
          <a class="nav-item ${this.activeMenu === 'tarjeta' ? 'active' : ''}" href="demo-tarjeta.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 15h3m-3-3h3"/></svg>
            Tarjeta
          </a>

          <div class="nav-header">ORGANIZACIÓN</div>

          <a class="nav-item ${this.activeMenu === 'mes' ? 'active' : ''}" href="demo-mes.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Mes
          </a>
          <a class="nav-item ${this.activeMenu === 'periodicidad' ? 'active' : ''}" href="demo-periodicidad.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 4v6h-6"/><path d="M3 20v-6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>
            Periodicidad
          </a>
          <a class="nav-item ${this.activeMenu === 'quincena' ? 'active' : ''}" href="demo-quincena.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            Quincena
          </a>
          <a class="nav-item ${this.activeMenu === 'status' ? 'active' : ''}" href="demo-status.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/></svg>
            Status
          </a>
          <a class="nav-item ${this.activeMenu === 'tipoGasto' ? 'active' : ''}" href="demo-tipo-gasto.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
            Tipo de Gasto
          </a>
          <a class="nav-item ${this.activeMenu === 'persona' ? 'active' : ''}" href="demo-persona.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Persona
          </a>
        </div>

        <div class="sidebar-footer">   
          <button class="btn-settings" @click="${() => console.log('Ajustes')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Settings
          </button>

          <button class="btn-logout" @click="${() => window.location.href = 'demo-login.html'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('sidebar-menu', SidebarMenu);
