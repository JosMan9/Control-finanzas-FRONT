import '@webcomponents/scoped-custom-element-registry';
import '../src/components/tipoGasto/tablaTipoGasto.js';
import { html, render } from 'lit';
import { tipoGastoMock } from '../src/mocks/tipoGastoMock.js';

const demo = document.getElementById('demo');
const tiposGasto = tipoGastoMock;

const tablaTipoGastoComponent = () => html`
    <tabla-tipo-gasto
        id="mi-tabla"
        titulo="Mis Tipos de Gasto"
        .tiposGasto="${tiposGasto}"
        @tipos-gasto-actualizados="${(e) => {
            console.log('Tipos de gasto actualizados:', e.detail);
        }}">
    </tabla-tipo-gasto>
`;

render(tablaTipoGastoComponent(), demo);

