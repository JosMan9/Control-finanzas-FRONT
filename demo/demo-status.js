import '../src/components/index.js';

const mockEstados = [
  { id: 1, nombre: 'Pagado', descripcion: 'TRANSACCIÓN FINALIZADA', color: '#065F46' },
  { id: 2, nombre: 'Pendiente', descripcion: 'EN ESPERA', color: '#818CF8' },
  { id: 3, nombre: 'Atrasado', descripcion: 'VENCIDO', color: '#EF4444' }
];

const renderDemo = () => {
    const container = document.getElementById('demo');
    const statusEl = document.createElement('tabla-status');
    
    statusEl.estados = [...mockEstados];
    
    statusEl.addEventListener('status-actualizados', (e) => {
        console.log('Estados actualizados:', e.detail);
    });

    container.appendChild(statusEl);
};

document.addEventListener('DOMContentLoaded', renderDemo);
