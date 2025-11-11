import '@webcomponents/scoped-custom-element-registry';
import '../src/components/quincena/tablaQuincena.js';
import { html, render } from 'lit';
import { quincenaMock } from '../src/mocks/quincenaMock.js';

const demo = document.getElementById('demo');
const quincenas = quincenaMock;

const tablaQuincenaComponent = () => html`
    <tabla-quincena
        id="mi-tabla"
        titulo="Mis Quincenas"
        .quincenas="${quincenas}"
        @quincenas-actualizadas="${(e) => {
            console.log('Quincenas actualizadas:', e.detail);
        }}">
    </tabla-quincena>
`;

render(tablaQuincenaComponent(), demo);

