import { LitElement, html } from "lit";
import { tablaQuincenaStyles } from "./tablaQuincena.styles.js";
import "./modals/modalAgregarQuincena.js";

export class TablaQuincena extends LitElement {
  static properties = {
    titulo: { type: String },
    quincenas: { type: Array },
    cargando: { type: Boolean },
  };

  static styles = [tablaQuincenaStyles];

  constructor() {
    super();
    this.titulo = "Quincenas";
    this.quincenas = [];
    this.cargando = false;
  }

  get #renderSkeleton() {
    return html`
      <table>
        <thead>
          <tr>
            <th>
              <span
                class="skeleton"
                style="display:inline-block;width:120px;"
              ></span>
            </th>
            <th>
              <span
                class="skeleton"
                style="display:inline-block;width:140px;"
              ></span>
            </th>
            <th>
              <span
                class="skeleton"
                style="display:inline-block;width:80px;"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: 4 }).map(
            () => html`
              <tr>
                <td><div class="skeleton" style="width:100%;"></div></td>
                <td><div class="skeleton" style="width:100%;"></div></td>
                <td><div class="skeleton" style="width:60px;"></div></td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  get #renderTabla() {
    if (!this.quincenas?.length) {
      return html`<div class="empty">No hay datos para mostrar.</div>`;
    }
    return html`
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.quincenas.map(
            (q) => html`
              <tr>
                <td>${q.nombre ?? ""}</td>
                <td>${this.convertidorFecha(q.fecha) ?? ""}</td>
                <td class="acciones">
                  <button
                    class="btn-editar"
                    @click="${() => this.#editarQuincena(q)}"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    class="btn-eliminar"
                    @click="${() => this.#eliminarQuincena(q.id)}"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  #abrirModal(quincena = null) {
    const modal = this.shadowRoot.querySelector("modal-agregar-quincena");
    if (modal) {
      if (typeof quincena.detail === "number") {
        modal.abrir();
      } else {
        modal.abrirParaEditar(quincena);
      }
    }
  }

  #editarQuincena(quincena) {
    this.#abrirModal(quincena);
  }

  #eliminarQuincena(id) {
    if (confirm("¿Estás seguro de que quieres eliminar esta quincena?")) {
      this.quincenas = this.quincenas.filter((q) => q.id !== id);
      this.requestUpdate();

      this.dispatchEvent(
        new CustomEvent("quincenas-actualizadas", {
          detail: this.quincenas,
        })
      );

      this.dispatchEvent(
        new CustomEvent("quincena-eliminada-id", {
          detail: id,
        })
      );
    }
  }

  #manejarQuincenaAgregada(e) {
    const nuevaQuincena = e.detail;
    const existe = this.quincenas.find((q) => q.id === nuevaQuincena.id);
    if (existe) {
      return;
    }

    if (!nuevaQuincena.id) {
      nuevaQuincena.id = Date.now();
    }
    this.quincenas = [...this.quincenas, nuevaQuincena];
    this.requestUpdate();
    console.log("Quincena agregada:", nuevaQuincena);

    this.dispatchEvent(
      new CustomEvent("quincenas-actualizadas", {
        detail: this.quincenas,
      })
    );

    this.dispatchEvent(
      new CustomEvent("quincena-creada", {
        detail: nuevaQuincena,
      })
    );
  }

  #manejarQuincenaEditada(e) {
    const quincenaEditada = e.detail;
    const index = this.quincenas.findIndex((q) => q.id === quincenaEditada.id);
    if (index !== -1) {
      this.quincenas = [
        ...this.quincenas.slice(0, index),
        quincenaEditada,
        ...this.quincenas.slice(index + 1),
      ];
      this.requestUpdate();
      console.log("Quincena editada:", quincenaEditada);

      this.dispatchEvent(
        new CustomEvent("quincenas-actualizadas", {
          detail: this.quincenas,
        })
      );

      this.dispatchEvent(
        new CustomEvent("quincena-actualizada", {
          detail: quincenaEditada,
        })
      );
    }
  }

  #manejarModalCerrado() {
    // Opcional: manejar cuando se cierra el modal
  }

  get #renderModalQuincena() {
    return html`
      <modal-agregar-quincena
        @quincena-agregada="${this.#manejarQuincenaAgregada}"
        @quincena-editada="${this.#manejarQuincenaEditada}"
        @modal-cerrado="${this.#manejarModalCerrado}"
      >
      </modal-agregar-quincena>
    `;
  }

  get #renderHeader() {
    return html`
      <div class="header">
        <h2>${this.titulo}</h2>
        <div class="header-actions">
          <button class="btn-agregar" @click="${this.#abrirModal}">
            + Agregar Quincena
          </button>
          <slot name="acciones"></slot>
        </div>
      </div>
    `;
  }

  convertidorFecha(fechaString) {
    const date = new Date(fechaString);
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");

    return `${d}/${m}/${y}`;
  }

  render() {
    return html`
      ${this.#renderHeader}
      ${this.cargando ? this.#renderSkeleton : this.#renderTabla}
      ${this.#renderModalQuincena}
    `;
  }
}

customElements.define("tabla-quincena", TablaQuincena);
