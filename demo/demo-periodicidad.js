import '@webcomponents/scoped-custom-element-registry';
import '../src/components/periodicidad/tablaPeriodicidad.js';
import { html, render } from 'lit';
import { periodicidadMock } from '../src/mocks/periodicidadMock.js';

const demo = document.getElementById('demo');
const periodicidades = periodicidadMock;

const tablaPeriodicidadComponent = () => html`
    <tabla-periodicidad
        id="mi-tabla"
        titulo="Mis Periodicidades"
        .periodicidades="${periodicidades}"
        @periodicidades-actualizadas="${(e) => {
            console.log('Periodicidades actualizadas:', e.detail);
        }}">
    </tabla-periodicidad>
`;

render(tablaPeriodicidadComponent(), demo);

