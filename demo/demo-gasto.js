import '../src/components/gasto/tablaGasto.js';
import { html, render } from 'lit';
import { gastoMock } from '../src/mocks/gastoMock.js';
import { ingresoMock } from '../src/mocks/ingresoMock.js';
import { tipoGastoMock } from '../src/mocks/tipoGastoMock.js';
import { quincenaMock } from '../src/mocks/quincenaMock.js';
import { personaMock } from '../src/mocks/personaMock.js';

const demo = document.getElementById('demo');
const gastos = gastoMock;
const ingresos = ingresoMock;
const tipoGastos = tipoGastoMock;
const quincenas = quincenaMock;
const personas = personaMock;

const tablaGastoComponent = () => html`
    <tabla-gasto
        id="mi-tabla"
        titulo="Mis Gastos"
        .gastos="${gastos}"
        .ingresos="${ingresos}"
        .tipoGastos="${tipoGastos}"
        .quincenas="${quincenas}"
        .personas="${personas}"
        @gastos-actualizados="${(e) => {
        console.log('Gastos actualizados:', e.detail);
    }}">
    </tabla-gasto>
`;

render(tablaGastoComponent(), demo);


