import "../src/components/mes/tablaMes.js";
import { html, render } from "lit";
import { mesMock } from "../src/mocks/mesMock.js";

const demo = document.getElementById("demo");
const mesesIniciales = [
  ...mesMock,
];

render(html`
  <tabla-mes
    id="mi-tabla-mes"
    titulo="Configuracion de Meses"
    .meses="${mesesIniciales}"
    @meses-actualizados="${(e) => console.log("Meses actualizados:", e.detail)}"
    @mes-actual-cambiado="${(e) => console.log("Mes actual:", e.detail)}"
  ></tabla-mes>
`, demo);
