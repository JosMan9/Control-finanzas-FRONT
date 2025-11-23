import { ingresoMock } from './ingresoMock.js';
import { tipoGastoMock } from './tipoGastoMock.js';

export const gastoMock = [
    {
        id: 1,
        concepto: 'Compra de supermercado',
        monto: 1500,
        fechaOperacion: '2025-11-10T00:00:00.000+00:00',
        esCubierto: true,
        ingreso: ingresoMock[0],
        tipoGasto: tipoGastoMock[2],
    },
    {
        id: 2,
        concepto: 'Pago de tarjeta de crédito',
        monto: 5000,
        fechaOperacion: '2026-10-10T00:00:00.000+00:00',
        esCubierto: false,
        ingreso: ingresoMock[1],
        tipoGasto: tipoGastoMock[1],
    },
    {
        id: 3,
        concepto: 'Gasolina',
        monto: 800,
        fechaOperacion: '2025-10-10T00:00:00.000+00:00',
        esCubierto: true,
        ingreso: ingresoMock[0],
        tipoGasto: tipoGastoMock[2],
    }
];

