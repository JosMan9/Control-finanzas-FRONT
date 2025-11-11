import { LitElement, html } from 'lit';
import { tablaPeriodicidadStyles } from './tablaPeriodicidad.styles.js';
import './modals/modalAgregarPeriodicidad.js';


export class TablaPeriodicidad extends LitElement {
  static properties = {
    titulo: { type: String },
    periodicidades: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaPeriodicidadStyles];

  constructor() {
    super();
    this.titulo = 'Periodicidades';
    this.periodicidades = [];
    this.cargando = false;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:80px;"></span></th>
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
    if (!this.periodicidades?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Días</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.periodicidades.map(p => html`
            <tr>
              <td>${p.nombre ?? ''}</td>
              <td>${p.dias ?? ''}</td>
              <td>${p.activo ? '✓' : '✗'}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarPeriodicidad(p)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarPeriodicidad(p.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(periodicidad = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-periodicidad');
    if (modal) {
      if (typeof periodicidad.detail === 'number' ) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(periodicidad);
      }
    }
  }

  #editarPeriodicidad(periodicidad) {
    this.#abrirModal(periodicidad);
  }

  #eliminarPeriodicidad(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta periodicidad?')) {
      this.periodicidades = this.periodicidades.filter(p => p.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', {
        detail: this.periodicidades
      }));
    }
  }

  #manejarPeriodicidadAgregada(e) {
    const nuevaPeriodicidad = e.detail;
    const existe = this.periodicidades.find(p => p.id === nuevaPeriodicidad.id);
    if (existe) {
      return;
    }

    if (!nuevaPeriodicidad.id) {
      nuevaPeriodicidad.id = Date.now();
    }
    this.periodicidades = [...this.periodicidades, nuevaPeriodicidad];
    this.requestUpdate();
    console.log('Periodicidad agregada:', nuevaPeriodicidad);

    this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', {
      detail: this.periodicidades
    }));
  }

  #manejarPeriodicidadEditada(e) {
    const periodicidadEditada = e.detail;
    const index = this.periodicidades.findIndex(p => p.id === periodicidadEditada.id);
    if (index !== -1) {
      this.periodicidades = [
        ...this.periodicidades.slice(0, index),
        periodicidadEditada,
        ...this.periodicidades.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Periodicidad editada:', periodicidadEditada);

      this.dispatchEvent(new CustomEvent('periodicidades-actualizadas', {
        detail: this.periodicidades
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalPeriodicidad() {
    return html`
      <modal-agregar-periodicidad
        @periodicidad-agregada="${this.#manejarPeriodicidadAgregada}"
        @periodicidad-editada="${this.#manejarPeriodicidadEditada}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-periodicidad>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Periodicidad
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
    ${this.#renderModalPeriodicidad}
    `;
  }

}

customElements.define('tabla-periodicidad', TablaPeriodicidad);

