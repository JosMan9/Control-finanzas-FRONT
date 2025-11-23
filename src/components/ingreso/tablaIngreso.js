import { LitElement, html } from 'lit';
import { tablaIngresoStyles } from './tablaIngreso.styles.js';
import './modals/modalAgregarIngreso.js';


export class TablaIngreso extends LitElement {
  static properties = {
    titulo: { type: String },
    ingresos: { type: Array },
    quincenas: { type: Array },
    periodicidades: { type: Array },
    cargando: { type: Boolean },
    filtroQuincena: { type: String },
    filtroPeriodicidad: { type: String },
  };

  static styles = [tablaIngresoStyles];

  constructor() {
    super();
    this.titulo = 'Ingresos';
    this.ingresos = [];
    this.quincenas = [];
    this.periodicidades = [];
    this.cargando = false;
    this.filtroQuincena = '';
    this.filtroPeriodicidad = '';
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:140px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
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
    if (!this.ingresos?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
            <th>Quincena</th>
            <th>Periodicidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.ingresos
        .filter(i => !this.filtroQuincena || i.quincena?.nombre === this.filtroQuincena)
        .filter(i => !this.filtroPeriodicidad || i.periodicidad?.nombre === this.filtroPeriodicidad)
        .map(i => html`
            <tr>
              <td>${i.nombre ?? ''}</td>
              <td>$${i.monto?.toLocaleString('es-MX') ?? '0'}</td>
              <td>${i.quincena?.nombre ?? 'N/A'}</td>
              <td>${i.periodicidad?.nombre ?? 'N/A'}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarIngreso(i)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarIngreso(i.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(ingreso = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-ingreso');
    if (modal) {
      if (typeof ingreso.detail === 'number') {
        modal.abrir();
      } else {
        modal.abrirParaEditar(ingreso);
      }
    }
  }

  #editarIngreso(ingreso) {
    this.#abrirModal(ingreso);
  }

  #eliminarIngreso(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este ingreso?')) {
      this.ingresos = this.ingresos.filter(i => i.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
        detail: this.ingresos
      }));

      this.dispatchEvent(new CustomEvent('ingreso-eliminado-id', {
        detail: id
      }));
    }
  }

  #manejarIngresoAgregado(e) {
    const nuevoIngreso = e.detail;
    const existe = this.ingresos.find(i => i.id === nuevoIngreso.id);
    if (existe) {
      return;
    }

    if (!nuevoIngreso.id) {
      nuevoIngreso.id = Date.now();
    }
    this.ingresos = [...this.ingresos, nuevoIngreso];
    this.requestUpdate();
    console.log('Ingreso agregado:', nuevoIngreso);

    this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
      detail: this.ingresos
    }));

    this.dispatchEvent(new CustomEvent('ingreso-creado', {
      detail: nuevoIngreso
    }));
  }

  #manejarIngresoEditado(e) {
    const ingresoEditado = e.detail;
    const index = this.ingresos.findIndex(i => i.id === ingresoEditado.id);
    if (index !== -1) {
      this.ingresos = [
        ...this.ingresos.slice(0, index),
        ingresoEditado,
        ...this.ingresos.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Ingreso editado:', ingresoEditado);

      this.dispatchEvent(new CustomEvent('ingresos-actualizados', {
        detail: this.ingresos
      }));

      this.dispatchEvent(new CustomEvent('ingreso-actualizado', {
        detail: ingresoEditado
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  #resetearFiltros() {
    this.filtroQuincena = '';
    this.filtroPeriodicidad = '';
    this.requestUpdate();
  }

  get #renderModalIngreso() {
    return html`
      <modal-agregar-ingreso
        .quincenas="${this.quincenas}"
        .periodicidades="${this.periodicidades}"
        @ingreso-agregado="${this.#manejarIngresoAgregado}"
        @ingreso-editado="${this.#manejarIngresoEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-ingreso>
    `;
  }

  get uniqueQuincenas() {
    const quincenas = new Set();
    this.ingresos.forEach(i => {
      if (i.quincena?.nombre) {
        quincenas.add(i.quincena.nombre);
      }
    });
    return Array.from(quincenas);
  }

  get uniquePeriodicidades() {
    const periodicidades = new Set();
    this.ingresos.forEach(i => {
      if (i.periodicidad?.nombre) {
        periodicidades.add(i.periodicidad.nombre);
      }
    });
    return Array.from(periodicidades);
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 10px;">
            <button class="btn-agregar" @click="${this.#abrirModal}">
              + Agregar Ingreso
            </button>
            <button 
              class="btn-reset" 
              @click="${this.#resetearFiltros}"
              style="padding: 8px 16px; border-radius: 4px; border: 1px solid #dc3545; background-color: #dc3545; color: white; cursor: pointer; font-weight: 500; transition: background-color 0.2s;"
              onmouseover="this.style.backgroundColor='#c82333'"
              onmouseout="this.style.backgroundColor='#dc3545'"
            >
              🗑️ Limpiar Filtros
            </button>
          </div>
          <div style="display: flex; gap: 10px;">
            <select 
              class="form-control" 
              .value="${this.filtroQuincena}"
              @change="${e => this.filtroQuincena = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todas las quincenas</option>
              ${this.uniqueQuincenas.map(q => html`
                <option value="${q}">${q}</option>
              `)}
            </select>
            <select 
              class="form-control" 
              .value="${this.filtroPeriodicidad}"
              @change="${e => this.filtroPeriodicidad = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todas las periodicidades</option>
              ${this.uniquePeriodicidades.map(p => html`
                <option value="${p}">${p}</option>
              `)}
            </select>
          </div>
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
    ${this.#renderModalIngreso}
    `;
  }

}

customElements.define('tabla-ingreso', TablaIngreso);

