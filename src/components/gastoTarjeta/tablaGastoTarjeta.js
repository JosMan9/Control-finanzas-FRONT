import { LitElement, html } from 'lit';
import { tablaGastoTarjetaStyles } from './tablaGastoTarjeta.styles.js';
import './modals/modalAgregarGastoTarjeta.js';


export class TablaGastoTarjeta extends LitElement {
  static properties = {
    titulo: { type: String },
    gastosTarjeta: { type: Array },
    tarjetas: { type: Array },
    gastos: { type: Array },
    cargando: { type: Boolean },
    meses: { type: Array },
    filtroMesCorte: { type: String },
    filtroEsMio: { type: String },
    filtroEsCubierto: { type: String },
    filtroQuincena: { type: String },
    filtroTarjeta: { type: String },
    filtroAño: { type: String },
  };

  static styles = [tablaGastoTarjetaStyles];

  constructor() {
    super();
    this.titulo = 'Gastos Tarjeta';
    this.gastosTarjeta = [];
    this.tarjetas = [];
    this.gastos = [];
    this.cargando = false;
    this.meses = [];
    this.filtroMesCorte = '';
    this.filtroEsMio = '';
    this.filtroEsCubierto = '';
    this.filtroQuincena = '';
    this.filtroTarjeta = '';
    this.filtroAño = '';
  }

  convertidorFecha(fechaString) {
    if (!fechaString) return 'N/A';
    const date = new Date(fechaString);
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");

    return `${d}/${m}/${y}`;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:100px;"></span></th>
            <th><span class="skeleton" style="display:inline-block;width:120px;"></span></th>
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
    if (!this.gastosTarjeta?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
          <th>Concepto</th>
            <th>Mes de Corte</th>
            <th>Mes Actual</th>
            <th>Mes Final</th>
            <th>Dia Pago</th>
            <th>Es Mío</th>
            <th>Cantidad Abonada</th>
            <th>Monto</th>
            <th>Fecha Operación</th>
            <th>Es Cubierto</th>
            <th>Nombre Quincena</th>
            <th>Fecha Quincena</th>
            <th>Nombre Tarjeta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.gastosTarjeta
        .filter(gt => !this.filtroMesCorte || gt.mes?.nombreMes === this.filtroMesCorte)
        .filter(gt => {
          if (this.filtroEsMio === 'true') return gt.esMio;
          if (this.filtroEsMio === 'false') return !gt.esMio;
          return true;
        })
        .filter(gt => {
          if (this.filtroEsCubierto === 'true') return gt.gasto?.esCubierto;
          if (this.filtroEsCubierto === 'false') return !gt.gasto?.esCubierto;
          return true;
        })
        .filter(gt => !this.filtroQuincena || gt.gasto?.ingreso?.quincena?.nombre === this.filtroQuincena)
        .filter(gt => !this.filtroTarjeta || gt.tarjeta?.nombre === this.filtroTarjeta)
        .filter(gt => {
          if (!this.filtroAño) return true;
          if (!gt.gasto?.fechaOperacion) return false;
          const fecha = new Date(gt.gasto.fechaOperacion);
          return fecha.getFullYear().toString() === this.filtroAño;
        })
        .map(gt => html`
            <tr>
              <td>${gt.gasto?.concepto ?? 'N/A'}</td>
              <td>${gt.mes?.nombreMes ?? 'N/A'}</td>
              <td>${gt.mesActual}</td>
              <td>${gt.mesFinal}</td>
              <td>${gt.tarjeta?.diaPago ?? 'N/A'}</td>
              <td>
                <span class="badge ${gt.esMio ? 'badge-mio' : 'badge-no-mio'}">
                  ${gt.esMio ? 'Sí' : 'No'}
                </span>
              </td>
              <td>$${gt.cantidadAbonada?.toLocaleString('es-MX') ?? '0'}</td>
              <td>$${gt.gasto?.monto?.toFixed(2) ?? '0.00'}</td>
              <td>${this.convertidorFecha(gt.gasto?.fechaOperacion)}</td>
              <td>
                <span class="badge ${gt.gasto?.esCubierto ? 'badge-cubierto' : 'badge-no-cubierto'}">
                  ${gt.gasto?.esCubierto ? 'Cubierto' : 'No Cubierto'}
                </span>
              </td>
              <td>${gt.gasto?.ingreso?.quincena?.nombre ?? 'N/A'}</td>
              <td>${this.convertidorFecha(gt.gasto?.ingreso?.quincena?.fecha)}</td>
              <td>${gt.tarjeta?.nombre ?? 'N/A'}</td>
              <td class="acciones">
                <button class="btn-editar" @click="${() => this.#editarGastoTarjeta(gt)}" title="Editar">
                  ✏️
                </button>
                <button class="btn-eliminar" @click="${() => this.#eliminarGastoTarjeta(gt.id)}" title="Eliminar">
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  #abrirModal(gastoTarjeta = null) {
    const modal = this.shadowRoot.querySelector('modal-agregar-gasto-tarjeta');
    if (modal) {
      if (typeof gastoTarjeta.detail === 'number' || !gastoTarjeta) {
        modal.abrir();
      } else {
        modal.abrirParaEditar(gastoTarjeta);
      }
    }
  }

  #editarGastoTarjeta(gastoTarjeta) {
    this.#abrirModal(gastoTarjeta);
  }

  #eliminarGastoTarjeta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto de tarjeta?')) {
      this.gastosTarjeta = this.gastosTarjeta.filter(gt => gt.id !== id);
      this.requestUpdate();

      this.dispatchEvent(new CustomEvent('gastos-tarjeta-actualizados', {
        detail: this.gastosTarjeta
      }));

      this.dispatchEvent(new CustomEvent('gasto-tarjeta-eliminado-id', {
        detail: id
      }));
    }
  }

  #manejarGastoTarjetaAgregado(e) {
    const nuevoGastoTarjeta = e.detail;
    const existe = this.gastosTarjeta.find(gt => gt.id === nuevoGastoTarjeta.id);
    if (existe) {
      return;
    }

    if (!nuevoGastoTarjeta.id) {
      nuevoGastoTarjeta.id = Date.now();
    }
    this.gastosTarjeta = [...this.gastosTarjeta, nuevoGastoTarjeta];
    this.requestUpdate();
    console.log('Gasto tarjeta agregado:', nuevoGastoTarjeta);

    this.dispatchEvent(new CustomEvent('gastos-tarjeta-actualizados', {
      detail: this.gastosTarjeta
    }));

    this.dispatchEvent(new CustomEvent('gasto-tarjeta-creada', {
      detail: nuevoGastoTarjeta
    }));
  }

  #manejarGastoTarjetaEditado(e) {
    const gastoTarjetaEditado = e.detail;
    const index = this.gastosTarjeta.findIndex(gt => gt.id === gastoTarjetaEditado.id);
    if (index !== -1) {
      this.gastosTarjeta = [
        ...this.gastosTarjeta.slice(0, index),
        gastoTarjetaEditado,
        ...this.gastosTarjeta.slice(index + 1)
      ];
      this.requestUpdate();
      console.log('Gasto tarjeta editado:', gastoTarjetaEditado);

      this.dispatchEvent(new CustomEvent('gastos-tarjeta-actualizados', {
        detail: this.gastosTarjeta
      }));

      this.dispatchEvent(new CustomEvent('gasto-tarjeta-actualizado', {
        detail: gastoTarjetaEditado
      }));
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  #resetearFiltros() {
    this.filtroMesCorte = '';
    this.filtroEsMio = '';
    this.filtroEsCubierto = '';
    this.filtroQuincena = '';
    this.filtroTarjeta = '';
    this.filtroAño = '';
    this.requestUpdate();
  }

  get #renderModalGastoTarjeta() {
    return html`
      <modal-agregar-gasto-tarjeta
        .tarjetas="${this.tarjetas}"
        .gastos="${this.gastos}"
        .meses="${this.meses}"
        @gasto-tarjeta-agregado="${this.#manejarGastoTarjetaAgregado}"
        @gasto-tarjeta-editado="${this.#manejarGastoTarjetaEditado}"
        @modal-cerrado="${this.#manejarModalCerrado}">
      </modal-agregar-gasto-tarjeta>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 10px;">
            <button class="btn-agregar" @click="${this.#abrirModal}">
              + Agregar Gasto Tarjeta
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
              .value="${this.filtroMesCorte}"
              @change="${e => this.filtroMesCorte = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los meses de corte</option>
              ${this.uniqueMesesCorte.map(m => html`
                <option value="${m}">${m}</option>
              `)}
            </select>
            <select 
              class="form-control" 
              .value="${this.filtroEsMio}"
              @change="${e => this.filtroEsMio = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos (Es Mío)</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <select 
              class="form-control" 
              .value="${this.filtroEsCubierto}"
              @change="${e => this.filtroEsCubierto = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos (Es Cubierto)</option>
              <option value="true">Cubierto</option>
              <option value="false">No Cubierto</option>
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
              .value="${this.filtroTarjeta}"
              @change="${e => this.filtroTarjeta = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todas las tarjetas</option>
              ${this.uniqueTarjetas.map(t => html`
                <option value="${t}">${t}</option>
              `)}
            </select>
            <select 
              class="form-control" 
              .value="${this.filtroAño}"
              @change="${e => this.filtroAño = e.target.value}"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
            >
              <option value="">Todos los años</option>
              ${this.uniqueAños.map(a => html`
                <option value="${a}">${a}</option>
              `)}
            </select>
          </div>
          <slot name="acciones"></slot>
        </div>
      </div>
    `;
  }

  get uniqueMesesCorte() {
    const meses = new Set();
    this.gastosTarjeta.forEach(gt => {
      if (gt.mes?.nombreMes) {
        meses.add(gt.mes.nombreMes);
      }
    });
    return Array.from(meses);
  }

  get uniqueQuincenas() {
    const quincenas = new Set();
    this.gastosTarjeta.forEach(gt => {
      if (gt.gasto?.ingreso?.quincena?.nombre) {
        quincenas.add(gt.gasto.ingreso.quincena.nombre);
      }
    });
    return Array.from(quincenas);
  }

  get uniqueTarjetas() {
    const tarjetas = new Set();
    this.gastosTarjeta.forEach(gt => {
      if (gt.tarjeta?.nombre) {
        tarjetas.add(gt.tarjeta.nombre);
      }
    });
    return Array.from(tarjetas);
  }

  get uniqueAños() {
    const años = new Set();
    this.gastosTarjeta.forEach(gt => {
      if (gt.gasto?.fechaOperacion) {
        const fecha = new Date(gt.gasto.fechaOperacion);
        años.add(fecha.getFullYear().toString());
      }
    });
    return Array.from(años).sort();
  }

  render() {
    return html`
      ${this.#renderHeader}
      ${this.cargando ? this.#renderSkeleton : this.#renderTabla}
      ${this.#renderModalGastoTarjeta}
`;
  }

}

customElements.define('tabla-gasto-tarjeta', TablaGastoTarjeta);
