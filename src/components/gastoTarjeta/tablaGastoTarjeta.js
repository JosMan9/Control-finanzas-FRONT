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
  }

  convertidorFecha(fechaString) {
    if (!fechaString) return 'N/A';
    const date = new Date(fechaString);
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
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
            <th>Mes de Corte</th>
            <th>Mes Actual</th>
            <th>Mes Final</th>
            <th>Nombre Tarjeta</th>
            <th>Dia Pago</th>
            <th>Es Mío</th>
            <th>Cantidad Abonada</th>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha Operación</th>
            <th>Es Cubierto</th>
            <th>Nombre Quincena</th>
            <th>Fecha Quincena</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.gastosTarjeta.map(gt => html`
            <tr>
              <td>${gt.mes?.nombre ?? 'N/A'}</td>
              <td>${gt.mesActual}</td>
              <td>${gt.mesFinal}</td>
              <td>${gt.tarjeta?.nombre ?? 'N/A'}</td>
              <td>${gt.tarjeta?.diaPago ?? 'N/A'}</td>
              <td>
                <span class="badge ${gt.esMio ? 'badge-mio' : 'badge-no-mio'}">
                  ${gt.esMio ? 'Sí' : 'No'}
                </span>
              </td>
              <td>$${gt.cantidadAbonada?.toLocaleString('es-MX') ?? '0'}</td>
              <td>${gt.gasto?.concepto ?? 'N/A'}</td>
              <td>$${gt.gasto?.monto?.toFixed(2) ?? '0.00'}</td>
              <td>${this.convertidorFecha(gt.gasto?.fechaOperacion)}</td>
              <td>
                <span class="badge ${gt.gasto?.esCubierto ? 'badge-cubierto' : 'badge-no-cubierto'}">
                  ${gt.gasto?.esCubierto ? 'Cubierto' : 'No Cubierto'}
                </span>
              </td>
              <td>${gt.gasto?.ingreso?.quincena?.nombre ?? 'N/A'}</td>
              <td>${this.convertidorFecha(gt.gasto?.ingreso?.quincena?.fecha)}</td>
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
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Gasto Tarjeta
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
    ${this.#renderModalGastoTarjeta}
    `;
  }

}

customElements.define('tabla-gasto-tarjeta', TablaGastoTarjeta);

