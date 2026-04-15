import { LitElement, html } from 'lit';
import { tablaPersonaStyles } from './tablaPersona.styles.js';
import '../layout/sidebarMenu.js';
import '../notificaciones/modalExito.js';
import '../notificaciones/modalError.js';
import '../notificaciones/modalConfirmacion.js';

export class TablaPersona extends LitElement {
  static properties = {
    personas: { type: Array },
    _formNombre: { type: String, state: true },
    _formApellido1: { type: String, state: true },
    _formApellido2: { type: String, state: true },
    _formAlias: { type: String, state: true },
    _enEdicionId: { type: Number, state: true },
    _searchQuery: { type: String, state: true },
    _vistaGrid: { type: Boolean, state: true },
    _paginaActual: { type: Number, state: true },

    _mostrarModalExito: { type: Boolean, state: true },
    _tituloModalExito: { type: String, state: true },
    _mensajeModalExito: { type: String, state: true },
    _mostrarModalError: { type: Boolean, state: true },
    _mostrarModalConfirmacion: { type: Boolean, state: true },
    _itemAEliminar: { type: Number, state: true },
    _itemsPerPage: { type: Number, state: true }
  };

  static styles = tablaPersonaStyles;

  constructor() {
    super();
    this.personas = [];
    this._searchQuery = '';
    this._vistaGrid = false;
    this._paginaActual = 1;
    this._limpiarFormulario();

    this._mostrarModalExito = false;
    this._tituloModalExito = "";
    this._mensajeModalExito = "";
    this._mostrarModalError = false;
    this._mostrarModalConfirmacion = false;
    this._itemAEliminar = null;
    this._itemsPerPage = 6;
    this._handleResize = this._updateItemsPerPage.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
    this._updateItemsPerPage();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    super.disconnectedCallback();
  }

  _updateItemsPerPage() {
    const width = window.innerWidth;
    let newCount = 6;
    if (width > 1600) newCount = 12;
    else if (width > 1200) newCount = 10;
    else if (width > 768) newCount = 8;
    else newCount = 4;

    if (this._itemsPerPage !== newCount) {
      this._itemsPerPage = newCount;
    }
  }

  _limpiarFormulario() {
    this._enEdicionId = null;
    this._formNombre = '';
    this._formApellido1 = '';
    this._formApellido2 = '';
    this._formAlias = '';
  }

  #editarPersona(persona) {
    this._enEdicionId = persona.id;
    this._formNombre = persona.nombre || '';
    this._formApellido1 = persona.apellido1 || '';
    this._formApellido2 = persona.apellido2 || '';
    this._formAlias = persona.alias || '';
  }

  #guardar() {
    if (!this._formNombre.trim()) {
      alert("Por favor ingresa el nombre de la persona.");
      return;
    }

    if (this._formNombre.toLowerCase() === 'error') {
      this._mostrarModalError = true;
      return;
    }

    if (this._enEdicionId) {
      // Update
      const index = this.personas.findIndex(p => p.id === this._enEdicionId);
      if (index !== -1) {
        this.personas[index] = {
          ...this.personas[index],
          nombre: this._formNombre.trim(),
          apellido1: this._formApellido1.trim(),
          apellido2: this._formApellido2.trim(),
          alias: this._formAlias.trim()
        };

        this._tituloModalExito = "¡Perfil Actualizado!";
        this._mensajeModalExito = `Los cambios en el perfil de "${this._formNombre}" se han guardado con éxito.`;
        this._mostrarModalExito = true;
      }
    } else {
      // Create new
      const nuevaPersona = {
        id: Date.now(),
        nombre: this._formNombre.trim(),
        apellido1: this._formApellido1.trim(),
        apellido2: this._formApellido2.trim(),
        alias: this._formAlias.trim(),
        vinculados: 0,
        foto: null
      };
      this.personas = [...this.personas, nuevaPersona];

      this._tituloModalExito = "¡Persona Registrada!";
      this._mensajeModalExito = `"${nuevaPersona.nombre}" ha sido añadido correctamente a tus contactos.`;
      this._mostrarModalExito = true;
    }

    this._limpiarFormulario();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("personas-actualizadas", { detail: this.personas }));
  }

  #solicitarEliminacion(id) {
    this._itemAEliminar = id;
    this._mostrarModalConfirmacion = true;
  }

  #confirmarEliminacion() {
    if (this._itemAEliminar === null) return;
    const id = this._itemAEliminar;
    const persona = this.personas.find(p => p.id === id);
    const nombre = persona ? persona.nombre : '';

    this.personas = this.personas.filter(p => p.id !== id);
    if (this._enEdicionId === id) this._limpiarFormulario();

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("personas-actualizadas", { detail: this.personas }));

    this._itemAEliminar = null;
    this._mostrarModalConfirmacion = false;

    this._tituloModalExito = "¡Contacto Eliminado!";
    this._mensajeModalExito = `Se ha borrado el registro de "${nombre}" correctamente.`;
    this._mostrarModalExito = true;
  }

  get #filteredPersonas() {
    if (!this._searchQuery) return this.personas;
    const q = this._searchQuery.toLowerCase();
    return this.personas.filter(p =>
      (p.nombre + ' ' + (p.apellido1 || '') + ' ' + (p.apellido2 || '')).toLowerCase().includes(q) ||
      (p.alias || '').toLowerCase().includes(q)
    );
  }

  get #paginatedPersonas() {
    const start = (this._paginaActual - 1) * this._itemsPerPage;
    const end = start + this._itemsPerPage;
    return this.#filteredPersonas.slice(start, end);
  }

  get #totalPages() {
    return Math.max(1, Math.ceil(this.#filteredPersonas.length / this._itemsPerPage));
  }

  render() {
    // Ensure current page is valid after filters or resize
    const totalPages = this.#totalPages;
    if (this._paginaActual > totalPages) this._paginaActual = totalPages;

    const paginated = this.#paginatedPersonas;

    return html`
      <div class="layout">
        <sidebar-menu activeMenu="persona"></sidebar-menu>

        <div class="main">
          <div class="top-bar">
            <div class="search-container">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input class="search-input" placeholder="Buscar personas..." .value="${this._searchQuery}" @input="${e => this._searchQuery = e.target.value}">
            </div>
            <div class="top-right">
              <svg class="config-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <div class="avatar-top">
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h40v40H0z" fill="#0B192C"/>
                  <path d="M20 18c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z" fill="#ffffff"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="page-header">
            <div class="header-left">
              <h1>Gestionar Contactos</h1>
              <p>Organiza a las personas involucradas en tus finanzas personales y asigna gastos de manera eficiente.</p>
            </div>
          </div>

          <div class="content-grid">
            
            <div class="left-content">
              <div class="form-card">
                <h3>Detalles de Persona</h3>

                <div class="form-group">
                  <label class="form-label">Nombre</label>
                  <input class="form-input" placeholder="Ej. Alejandro" .value="${this._formNombre}" @input="${e => this._formNombre = e.target.value}">
                </div>

                <div class="surname-grid">
                  <div class="form-group">
                    <label class="form-label">Primer Apellido</label>
                    <input class="form-input" placeholder="García" .value="${this._formApellido1}" @input="${e => this._formApellido1 = e.target.value}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Segundo Apellido</label>
                    <input class="form-input" placeholder="López" .value="${this._formApellido2}" @input="${e => this._formApellido2 = e.target.value}">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Alias (Identificador)</label>
                  <div class="alias-input-wrapper">
                    <span class="alias-at">@</span>
                    <input class="form-input form-input-alias" placeholder="alex_g" .value="${this._formAlias}" @input="${e => this._formAlias = e.target.value}">
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-save" @click="${this.#guardar}">
                    ${this._enEdicionId ? 'Guardar Cambios' : 'Registrar Persona'}
                  </button>
                  ${this._enEdicionId ? html`
                    <button class="btn-delete-icon" @click="${() => this.#solicitarEliminacion(this._enEdicionId)}">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  ` : ''}
                </div>

                <div class="info-box">
                  <div class="info-icon">i</div>
                  <p>Los alias te permiten buscar rápidamente a personas al registrar un nuevo gasto recurrente.</p>
                </div>
              </div>
            </div>

            <div class="right-content">
              <div class="stats-row">
                <div class="stat-mini-card">
                  <span class="stat-label">Total Personas</span>
                  <div class="stat-value">${this.personas.length}</div>
                </div>
              </div>

              <div class="list-header">
                <h3>Lista de Contactos</h3>
                <div class="view-toggles">
                  <button class="toggle-btn ${this._vistaGrid ? 'active' : ''}" @click="${() => this._vistaGrid = true}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </button>
                  <button class="toggle-btn ${!this._vistaGrid ? 'active' : ''}" @click="${() => this._vistaGrid = false}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                </div>
              </div>

              <div class="contacts-list ${this._vistaGrid ? 'grid-view' : ''}">
                ${paginated.map(persona => html`
                  <div class="contact-card">
                    <div class="contact-avatar">
                      <div class="initial-avatar">${persona.nombre.charAt(0)}${persona.apellido1 ? persona.apellido1.charAt(0) : ''}</div>
                    </div>
                    <div class="contact-main">
                      <div class="contact-name">${persona.nombre} ${persona.apellido1} ${persona.apellido2}</div>
                      <div class="contact-meta">
                        <span class="alias-badge">@${persona.alias || persona.nombre.toLowerCase()}</span>
                      </div>
                    </div>
                    <div class="contact-actions">
                      <button class="btn-edit-contact" @click="${() => this.#editarPersona(persona)}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Editar
                      </button>
                      <button class="btn-del-contact" @click="${() => this.#solicitarEliminacion(persona.id)}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
                ${paginated.length === 0 ? html`
                  <div class="empty-state" style="text-align:center; padding: 40px; color: var(--gray-400);">
                    No se encontraron contactos que coincidan con tu búsqueda.
                  </div>
                ` : ''}
              </div>

              <div class="pagination">
                <div class="pagination-info">
                  Mostrando ${Math.min(paginated.length, this._itemsPerPage)} de ${this.#filteredPersonas.length} contactos
                </div>
                <div class="page-numbers">
                  <div class="page-nav" @click="${() => this._paginaActual = Math.max(1, this._paginaActual - 1)}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </div>
                  
                  ${Array.from({ length: totalPages }, (_, i) => i + 1).map(num => html`
                    <div class="page-num ${this._paginaActual === num ? 'active' : ''}" @click="${() => this._paginaActual = num}">
                      ${num}
                    </div>
                  `)}

                  <div class="page-nav" @click="${() => this._paginaActual = Math.min(totalPages, this._paginaActual + 1)}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="footer-banner">
            <div class="banner-icon-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span class="banner-label-foot">CONSEJO LENDORA</span>
            <h2>Optimiza tu gestión de contactos</h2>
            <p>Mantén tus contactos actualizados para un mejor control de tus gastos compartidos.</p>
          </div>
        </div>
      </div>
      
      <modal-exito
        ?abierto="${this._mostrarModalExito}"
        .titulo="${this._tituloModalExito}"
        .mensaje="${this._mensajeModalExito}"
        @modal-exito-cerrado="${() => this._mostrarModalExito = false}">
      </modal-exito>
      <modal-error
        ?abierto="${this._mostrarModalError}"
        @modal-error-cerrado="${() => this._mostrarModalError = false}"
        @modal-error-reintentar="${() => { this._mostrarModalError = false; this.#guardar(); }}">
      </modal-error>
      <modal-confirmacion
        ?abierto="${this._mostrarModalConfirmacion}"
        @modal-confirmacion-cancelar="${() => { this._mostrarModalConfirmacion = false; this._itemAEliminar = null; }}"
        @modal-confirmacion-eliminar="${this.#confirmarEliminacion}">
      </modal-confirmacion>
    `;
  }
}

customElements.define("tabla-persona", TablaPersona);
