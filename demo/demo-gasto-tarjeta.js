import '../src/components/gastoTarjeta/tablaGastoTarjeta.js';
import { html, render } from 'lit';
import { gastoTarjetaMock } from '../src/mocks/gastoTarjetaMock.js';
import { tarjetaMock } from '../src/mocks/tarjetaMock.js';
import { gastoMock } from '../src/mocks/gastoMock.js';

const demo = document.getElementById('demo');
const gastosTarjeta = gastoTarjetaMock;
const tarjetas = tarjetaMock;
const gastos = gastoMock;

const tablaGastoTarjetaComponent = () => html`
    <tabla-gasto-tarjeta
        id="mi-tabla"
        titulo="Mis Gastos Tarjeta"
        .gastosTarjeta="${gastosTarjeta}"
        .tarjetas="${tarjetas}"
        .gastos="${gastos}"
        @gastos-tarjeta-actualizados="${(e) => {
            console.log('Gastos tarjeta actualizados:', e.detail);
        }}">
    </tabla-gasto-tarjeta>
`;

render(tablaGastoTarjetaComponent(), demo);

