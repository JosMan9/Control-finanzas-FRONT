import { html, render } from 'lit';
import '../src/components/persona/tablaPersona.js';
import { personaMock } from '../src/mocks/personaMock.js';

const template = html`
  <tabla-persona .personas=${personaMock}></tabla-persona>
`;

render(template, document.getElementById('demo'));

