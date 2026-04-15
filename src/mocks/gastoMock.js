import { ingresoMock } from './ingresoMock.js';
import { tipoGastoMock } from './tipoGastoMock.js';

export const gastoMock = [
    {
        id: 1,
        concepto: 'Arrendamiento Oficinas',
        monto: 4250.00,
        fechaOperacion: '2023-10-12T00:00:00.000Z',
        esCubierto: true,
        ingreso: { id: 1, nombre: 'REV-4822' },
        tipoGasto: { id: 1, nombre: 'Inmuebles', icono: 'building' },
        persona: { nombre: 'Alejandro R.' }
    },
    {
        id: 2,
        concepto: 'Suministro Eléctrico',
        monto: 842.15,
        fechaOperacion: '2023-10-10T00:00:00.000Z',
        esCubierto: false,
        ingreso: { id: 0, nombre: 'N/A' },
        tipoGasto: { id: 2, nombre: 'Servicios', icono: 'bolt' },
        persona: { nombre: 'Mariana S.' }
    },
    {
        id: 3,
        concepto: 'Software CRM',
        monto: 199.00,
        fechaOperacion: '2023-10-08T00:00:00.000Z',
        esCubierto: true,
        ingreso: { id: 2, nombre: 'SUB-9910' },
        tipoGasto: { id: 3, nombre: 'Digital', icono: 'cloud' },
        persona: { nombre: 'Alejandro R.' }
    },
    {
        id: 4,
        concepto: 'Mantenimiento Elevadores',
        monto: 1200.00,
        fechaOperacion: '2023-09-25T00:00:00.000Z',
        esCubierto: true,
        ingreso: { id: 1, nombre: 'REV-4822' },
        tipoGasto: { id: 1, nombre: 'Inmuebles', icono: 'building' },
        persona: { nombre: 'Marco V.' }
    },
    {
        id: 5,
        concepto: 'Publicidad Online',
        monto: 550.00,
        fechaOperacion: '2023-09-15T00:00:00.000Z',
        esCubierto: false,
        ingreso: { id: 2, nombre: 'SUB-9910' },
        tipoGasto: { id: 3, nombre: 'Digital', icono: 'cloud' },
        persona: { nombre: 'Mariana S.' }
    }
];
