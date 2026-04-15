import '../src/components/index.js';

const mockPersonas = [
  { id: 1, nombre: 'Javier', apellido1: 'Domínguez', apellido2: 'Castro', alias: 'javi_dom', foto: null },
  { id: 2, nombre: 'Sofía', apellido1: 'Martínez', apellido2: 'Ruiz', alias: 'sofia_mtz', foto: null },
  { id: 3, nombre: 'Ricardo', apellido1: 'Alarcón', apellido2: 'Soto', alias: 'ricky_a', foto: null },
  { id: 4, nombre: 'Marco', apellido1: 'Valdés', apellido2: 'Peña', alias: 'marco_vp', foto: null },
  { id: 5, nombre: 'Alejandra', apellido1: 'García', apellido2: 'Meza', alias: 'ale_g', foto: null },
  { id: 6, nombre: 'Bernardo', apellido1: 'Oswaldo', apellido2: 'Luna', alias: 'berni_os', foto: null },
  { id: 7, nombre: 'Camila', apellido1: 'Téllez', apellido2: 'Rojas', alias: 'cami_t', foto: null },
  { id: 8, nombre: 'Daniel', apellido1: 'Mendoza', apellido2: 'Suárez', alias: 'dan_men', foto: null },
  { id: 9, nombre: 'Elena', apellido1: 'Paredes', apellido2: 'Vaca', alias: 'elena_p', foto: null },
  { id: 10, nombre: 'Fernando', apellido1: 'Ríos', apellido2: 'Zavala', alias: 'fer_rios', foto: null },
  { id: 11, nombre: 'Gabriela', apellido1: 'Sánchez', apellido2: 'Díaz', alias: 'gaby_s', foto: null },
  { id: 12, nombre: 'Hugo', apellido1: 'Villarreal', apellido2: 'Lara', alias: 'hugo_v', foto: null },
  { id: 13, nombre: 'Isabela', apellido1: 'Blanco', apellido2: 'Pinto', alias: 'isa_b', foto: null },
  { id: 14, nombre: 'Jorge', apellido1: 'Navarro', apellido2: 'Guzmán', alias: 'jorge_n', foto: null },
  { id: 15, nombre: 'Karla', apellido1: 'Estrada', apellido2: 'Mora', alias: 'kar_es', foto: null },
  { id: 16, nombre: 'Luis', apellido1: 'Cabrera', apellido2: 'Falcón', alias: 'luis_c', foto: null },
  { id: 17, nombre: 'Mónica', apellido1: 'Salazar', apellido2: 'Ortiz', alias: 'moni_s', foto: null },
  { id: 18, nombre: 'Néstor', apellido1: 'Vargas', apellido2: 'Bravo', alias: 'nes_v', foto: null },
  { id: 19, nombre: 'Olivia', apellido1: 'Guerra', apellido2: 'Silva', alias: 'oli_g', foto: null },
  { id: 20, nombre: 'Pablo', apellido1: 'Uribe', apellido2: 'Pardo', alias: 'pablo_u', foto: null },
  { id: 21, nombre: 'Quetzalli', apellido1: 'Maya', apellido2: 'Sol', alias: 'quetz_m', foto: null },
  { id: 22, nombre: 'Roberto', apellido1: 'Toledo', apellido2: 'Luna', alias: 'rob_t', foto: null },
  { id: 23, nombre: 'Silvia', apellido1: 'Herrera', apellido2: 'Coba', alias: 'sil_h', foto: null },
  { id: 24, nombre: 'Tomás', apellido1: 'Zúñiga', apellido2: 'Mena', alias: 'tom_z', foto: null }
];

const renderDemo = () => {
    const container = document.getElementById('demo');
    const personaEl = document.createElement('tabla-persona');
    
    // Set initial data
    personaEl.personas = [...mockPersonas];
    
    personaEl.addEventListener('personas-actualizadas', (e) => {
        console.log('Personas actualizadas en Demo:', e.detail);
    });

    container.appendChild(personaEl);
};

document.addEventListener('DOMContentLoaded', renderDemo);
