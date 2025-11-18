import '../src/components/tarjeta/tablaTarjeta.js';
import { html, render } from 'lit';
import { tarjetaMock } from '../src/mocks/tarjetaMock.js';

const demo = document.getElementById('demo');
const tarjetas = tarjetaMock;

const tablaTarjetaComponent = () => html`
    <tabla-tarjeta
        id="mi-tabla"
        titulo="Mis Tarjetas de Crédito"
        .tarjetas="${tarjetas}"
        @tarjetas-actualizadas="${(e) => {
            console.log('Tarjetas actualizadas:', e.detail);
        }}">
    </tabla-tarjeta>
`;

render(tablaTarjetaComponent(), demo);

