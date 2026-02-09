import '../src/components/persona/tablaPersona.js';
import { personaMock } from '../src/mocks/personaMock.js';

const tabla = document.getElementById('tablaPersona');
tabla.personas = personaMock;

// Escuchar eventos
tabla.addEventListener('persona-creada', (e) => {
    console.log('Persona creada:', e.detail);
});

tabla.addEventListener('persona-actualizada', (e) => {
    console.log('Persona actualizada:', e.detail);
});

tabla.addEventListener('persona-eliminada-id', (e) => {
    console.log('Persona eliminada con ID:', e.detail);
});
