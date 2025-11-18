import '../src/components/ingreso/tablaIngreso.js';
import { html, render } from 'lit';
import { ingresoMock } from '../src/mocks/ingresoMock.js';
import { quincenaMock } from '../src/mocks/quincenaMock.js';
import { periodicidadMock } from '../src/mocks/periodicidadMock.js';

const demo = document.getElementById('demo');
const ingresos = ingresoMock;
const quincenas = quincenaMock;
const periodicidades = periodicidadMock;

const tablaIngresoComponent = () => html`
    <tabla-ingreso
        id="mi-tabla"
        titulo="Mis Ingresos"
        .ingresos="${ingresos}"
        .quincenas="${quincenas}"
        .periodicidades="${periodicidades}"
        @ingresos-actualizados="${(e) => {
            console.log('Ingresos actualizados:', e.detail);
        }}">
    </tabla-ingreso>
`;

render(tablaIngresoComponent(), demo);

