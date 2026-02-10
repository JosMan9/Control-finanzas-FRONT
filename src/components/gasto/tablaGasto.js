import { LitElement, html } from 'lit';
import { tablaGastoStyles } from './tablaGasto.styles.js';
import './modals/modalAgregarGasto.js';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];


export class TablaGasto extends LitElement {
  static properties = {
    titulo: { type: String },
    gastos: { type: Array },
    ingresos: { type: Array },
    tipoGastos: { type: Array },
    personas: { type: Array },
    cargando: { type: Boolean },
    filtroTipoGasto: { type: String },
    filtroQuincena: { type: String },
    filtroEstado: { type: String },
    filtroIngreso: { type: String },
    filtroMes: { type: String },
    filtroAño: { type: String },
    filtroPersona: { type: String },
  };

  static styles = [tablaGastoStyles];

  constructor() {
    super();
    this.titulo = 'Gastos';
    this.gastos = [];
    this.ingresos = [];
    this.tipoGastos = [];
    this.personas = [];
    this.cargando = false;
    this.filtroTipoGasto = '';
    this.filtroQuincena = '';
    this.filtroEstado = '';
    this.filtroIngreso = '';
    this.filtroMes = '';
    this.filtroAño = '';
    this.filtroPersona = '';

    // Paleta de colores bien diferenciados
    const baseColorPalette = [
      { bg: '#DBEAFE', text: '#1E40AF' }, // Azul
      { bg: '#FCE7F3', text: '#9F1239' }, // Rosa
      { bg: '#D1FAE5', text: '#065F46' }, // Verde
      { bg: '#FEF3C7', text: '#92400E' }, // Amarillo
      { bg: '#E0E7FF', text: '#3730A3' }, // Índigo
      { bg: '#FECACA', text: '#991B1B' }, // Rojo
      { bg: '#D1D5DB', text: '#1F2937' }, // Gris
      { bg: '#DDD6FE', text: '#5B21B6' }, // Púrpura
      { bg: '#FED7AA', text: '#9A3412' }, // Naranja
      { bg: '#A7F3D0', text: '#064E3B' }, // Esmeralda
      { bg: '#BAE6FD', text: '#075985' }, // Cielo
      { bg: '#FBCFE8', text: '#831843' }, // Fucsia
      { bg: '#FDE68A', text: '#78350F' }, // Ámbar
      { bg: '#C7D2FE', text: '#4338CA' }, // Violeta
      { bg: '#FCA5A5', text: '#7F1D1D' }, // Rosa rojizo
    ];

    // Mezclar aleatoriamente la paleta usando Fisher-Yates shuffle
    this.shuffledColorPalette = [...baseColorPalette];
    for (let i = this.shuffledColorPalette.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledColorPalette[i], this.shuffledColorPalette[j]] =
        [this.shuffledColorPalette[j], this.shuffledColorPalette[i]];
    }
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
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
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
              <td><div class="skeleton" style="width:100%;"></div></td>
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
    if (!this.gastos?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Ingreso</th>
            <th>Tipo de Gasto</th>
            <th>Quincena</th>
            <th>Persona</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.gastos
        .filter(g =>
          (!this.filtroTipoGasto || g.tipoGasto?.id == this.filtroTipoGasto) &&
          (!this.filtroQuincena || g.ingreso?.quincena?.nombre === this.filtroQuincena) &&
          (!this.filtroEstado || (this.filtroEstado === 'cubierto' ? g.esCubierto : !g.esCubierto)) &&
          (!this.filtroIngreso || g.ingreso?.nombre === this.filtroIngreso) &&
          (!this.filtroMes || this.#obtenerNombreMes(g.fechaOperacion) === this.filtroMes) &&
          (!this.filtroAño || (g.fechaOperacion && new Date(g.fechaOperacion).getFullYear().toString() === this.filtroAño)) &&
          (!this.filtroPersona || g.persona?.id == this.filtroPersona)
        )
        .map(g => html`
            <tr>
              <td>${g.concepto ?? ''}</td>
              <td>$${this.formatMonto(g.monto)}</td>
              <td>${this.convertidorFecha(g.fechaOperacion) ?? 'N/A'}</td>
              <td>${g.ingreso?.nombre ?? 'N/A'}</td>
              <td>${g.tipoGasto?.nombre ?? 'N/A'}</td>
              <td>${g.ingreso.quincena?.nombre ?? 'N/A'}</td>
              <td>
                ${g.persona ? html`
                  <span class="badge badge-persona" 
                        style="background-color: ${this.getPersonaColor(g.persona.id).bg}; color: ${this.getPersonaColor(g.persona.id).text};">
                    ${g.persona.alias || g.persona.nombre}
                  </span>
                ` : 'N/A'}
              </td>
              <td>
                <span class="badge ${g.esCubierto ? 'badge-cubierto' : 'badge-no-cubierto'}">
                  ${g.esCubierto ? 'Cubierto' : 'No Cubierto'}
                </span>
              </td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarGasto(g)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarGasto(g.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(gasto = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-gasto');
    if (modal) {
      if (typeof gasto.detail === 'number' || !gasto) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(gasto);
      }
    }
  }

  #editarGasto(gasto) {
    this.#abrirModal(gasto);
  }

  #eliminarGasto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      this.gastos = this.gastos.filter(g => g.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('gastos-actualizados', {
        detail: this.gastos
      }));

      this.dispatchEvent(new CustomEvent('gasto-eliminado-id', {
        detail: id
      }));
    }
  }

  #manejarGastoAgregado(e) {
    const nuevoGasto = e.detail;
    const existe = this.gastos.find(g => g.id === nuevoGasto.id);
    if (existe) {
      return;
    }

    if (!nuevoGasto.id) {
      nuevoGasto.id = Date.now();
    }
    this.gastos = [...this.gastos, nuevoGasto];
    this.requestUpdate();
    console.log('Gasto agregado:', nuevoGasto);

    this.dispatchEvent(new CustomEvent('gastos-actualizados', {
      detail: this.gastos
    }));

    this.dispatchEvent(new CustomEvent('gasto-agregado', {
      detail: nuevoGasto
    }));
  }

  #manejarGastoEditado(e) {
    const gastoEditado = e.detail;
    const index = this.gastos.findIndex(g => g.id === gastoEditado.id);
    if (index !== -1) {
      this.gastos = [
        ...this.gastos.slice(0, index),
        gastoEditado,
        ...this.gastos.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Gasto editado:', gastoEditado);

      this.dispatchEvent(new CustomEvent('gastos-actualizados', {
        detail: this.gastos
      }));

      this.dispatchEvent(new CustomEvent('gasto-actualizado', {
        detail: gastoEditado
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  #resetearFiltros() {
    this.filtroTipoGasto = '';
    this.filtroQuincena = '';
    this.filtroEstado = '';
    this.filtroIngreso = '';
    this.filtroMes = '';
    this.filtroAño = '';
    this.filtroPersona = '';
    this.requestUpdate();
  }

  get #renderModalGasto() {
    return html`
      <modal-agregar-gasto
        .ingresos="${this.ingresos}"
        .tipoGastos="${this.tipoGastos}"
        .personas="${this.personas}"
        @gasto-agregado="${this.#manejarGastoAgregado}"
        @gasto-editado="${this.#manejarGastoEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-gasto>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 10px;">
            <button class="btn-agregar" @click="${this.#abrirModal}">
              + Agregar Gasto
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
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <select 
              class="form-control" 
              .value="${this.filtroTipoGasto}"
              @change="${e => this.filtroTipoGasto = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los tipos</option>
              ${this.tipoGastos.map(t => html`
                <option value="${t.id}">${t.nombre}</option>
              `)}
            </select>

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
              .value="${this.filtroEstado}"
              @change="${e => this.filtroEstado = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los estados</option>
              <option value="cubierto">Cubierto</option>
              <option value="no_cubierto">No Cubierto</option>
            </select>

            <select 
              class="form-control" 
              .value="${this.filtroIngreso}"
              @change="${e => this.filtroIngreso = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los ingresos</option>
              ${this.uniqueIngresos.map(i => html`
                <option value="${i}">${i}</option>
              `)}
            </select>

            <select 
              .value="${this.filtroAño}"
              @change="${e => this.filtroAño = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los años</option>
              ${this.uniqueAños.map(a => html`
                <option value="${a}">${a}</option>
              `)}
            </select>

            <select 
              .value="${this.filtroPersona}"
              @change="${e => this.filtroPersona = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todas las personas</option>
              ${this.personas.map(p => html`
                <option value="${p.id}">${p.alias || p.nombre}</option>
              `)}
            </select>
          </div>
          <slot name="acciones"></slot>
        </div>
      </div>
    `;
  }

  get uniqueQuincenas() {
    const quincenas = new Set();
    this.gastos.forEach(g => {
      if (g.ingreso?.quincena?.nombre) {
        quincenas.add(g.ingreso.quincena.nombre);
      }
    });
    return Array.from(quincenas).sort();
  }

  get uniqueIngresos() {
    const ingresos = new Set();
    this.gastos.forEach(g => {
      if (g.ingreso?.nombre) {
        ingresos.add(g.ingreso.nombre);
      }
    });
    return Array.from(ingresos).sort();
  }

  get uniqueMeses() {
    const meses = new Set();
    this.gastos.forEach(g => {
      const nombreMes = this.#obtenerNombreMes(g.fechaOperacion);
      if (nombreMes) {
        meses.add(nombreMes);
      }
    });
    return Array.from(meses).sort((a, b) => MESES.indexOf(a) - MESES.indexOf(b));
  }

  get uniqueAños() {
    const años = new Set();
    this.gastos.forEach(g => {
      if (g.fechaOperacion) {
        const fecha = new Date(g.fechaOperacion);
        años.add(fecha.getFullYear().toString());
      }
    });
    return Array.from(años).sort();
  }

  #obtenerNombreMes(fechaString) {
    if (!fechaString) return null;
    const date = new Date(fechaString);
    return MESES[date.getUTCMonth()];
  }

  formatMonto(monto) {
    return monto ? Number(monto).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00';
  }

  convertidorFecha(fechaString) {
    const date = new Date(fechaString);
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");

    return `${d}/${m}/${y}`;
  }

  getPersonaColor(personaId) {
    if (!personaId) return { bg: '#e5e7eb', text: '#374151' };

    // Paleta de colores bien diferenciados
    const colorPalette = [
      { bg: '#DBEAFE', text: '#1E40AF' }, // Azul
      { bg: '#FCE7F3', text: '#9F1239' }, // Rosa
      { bg: '#D1FAE5', text: '#065F46' }, // Verde
      { bg: '#FEF3C7', text: '#92400E' }, // Amarillo
      { bg: '#E0E7FF', text: '#3730A3' }, // Índigo
      { bg: '#FECACA', text: '#991B1B' }, // Rojo
      { bg: '#D1D5DB', text: '#1F2937' }, // Gris
      { bg: '#DDD6FE', text: '#5B21B6' }, // Púrpura
      { bg: '#FED7AA', text: '#9A3412' }, // Naranja
      { bg: '#A7F3D0', text: '#064E3B' }, // Esmeralda
      { bg: '#BAE6FD', text: '#075985' }, // Cielo
      { bg: '#FBCFE8', text: '#831843' }, // Fucsia
      { bg: '#FDE68A', text: '#78350F' }, // Ámbar
      { bg: '#C7D2FE', text: '#4338CA' }, // Violeta
      { bg: '#FCA5A5', text: '#7F1D1D' }, // Rosa rojizo
    ];

    // Usar el ID para seleccionar un color de la paleta
    const index = personaId % colorPalette.length;
    return colorPalette[index];
  }

  render() {
    return html`
      ${this.#renderHeader}
      ${this.cargando
        ? this.#renderSkeleton
        : this.#renderTabla}
    ${this.#renderModalGasto}
    `;
  }

}

customElements.define('tabla-gasto', TablaGasto);
