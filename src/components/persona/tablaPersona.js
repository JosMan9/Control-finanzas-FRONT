import { LitElement, html } from 'lit';
import { tablaPersonaStyles } from './tablaPersona.styles.js';
import './modals/modalAgregarPersona.js';


export class TablaPersona extends LitElement {
    static properties = {
        titulo: { type: String },
        personas: { type: Array },
        cargando: { type: Boolean },
    };

    static styles = [tablaPersonaStyles];

    constructor() {
        super();
        this.titulo = 'Personas';
        this.personas = [];
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
              <td><div class="skeleton" style="width:60px;"></div></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
    }

    get #renderTabla() {
        if (!this.personas?.length) {
            return html`<div class="empty">No hay datos para mostrar.</div>`;
        }
        return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Alias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.personas.map(p => html`
            <tr>
              <td>${p.nombre ?? ''}</td>
              <td>${p.apellidoPaterno ?? ''}</td>
              <td>${p.apellidoMaterno ?? ''}</td>
              <td>${p.alias ?? ''}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarPersona(p)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarPersona(p.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
    }

    #abrirModal(persona = null) {
        const modal = this.shadowRoot.querySelector('modal-agregar-persona');
        if (modal) {
            if (typeof persona.detail === 'number') {
                modal.abrir();
            } else {
                modal.abrirParaEditar(persona);
            }
        }
    }

    #editarPersona(persona) {
        this.#abrirModal(persona);
    }

    #eliminarPersona(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta persona?')) {
            this.personas = this.personas.filter(p => p.id !== id);
            this.requestUpdate();

            this.dispatchEvent(new CustomEvent('personas-actualizadas', {
                detail: this.personas
            }));

            this.dispatchEvent(new CustomEvent('persona-eliminada-id', {
                detail: id
            }));
        }
    }

    #manejarPersonaAgregada(e) {
        const nuevaPersona = e.detail;
        const existe = this.personas.find(p => p.id === nuevaPersona.id);
        if (existe) {
            return;
        }

        if (!nuevaPersona.id) {
            nuevaPersona.id = Date.now();
        }
        this.personas = [...this.personas, nuevaPersona];
        this.requestUpdate();
        console.log('Persona agregada:', nuevaPersona);

        this.dispatchEvent(new CustomEvent('personas-creadas', {
            detail: this.personas
        }));

        this.dispatchEvent(new CustomEvent('persona-creada', {
            detail: nuevaPersona
        }));
    }

    #manejarPersonaEditada(e) {
        const personaEditada = e.detail;
        const index = this.personas.findIndex(p => p.id === personaEditada.id);
        if (index !== -1) {
            this.personas = [
                ...this.personas.slice(0, index),
                personaEditada,
                ...this.personas.slice(index + 1)
            ];
            this.requestUpdate();
            console.log('Persona editada:', personaEditada);

            this.dispatchEvent(new CustomEvent('personas-actualizadas', {
                detail: this.personas
            }));

            this.dispatchEvent(new CustomEvent('persona-actualizada', {
                detail: personaEditada
            }));
        }
    }

    #manejarModalCerrado() {
        // Opcional: manejar cuando se cierra el modal
    }

    get #renderModalPersona() {
        return html`
      <modal-agregar-persona
        @persona-agregada="${this.#manejarPersonaAgregada}"
        @persona-editada="${this.#manejarPersonaEditada}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-persona>
    `;
    }

    get #renderHeader() {
        return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Persona
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
    ${this.#renderModalPersona}
    `;
    }

}

customElements.define('tabla-persona', TablaPersona);
