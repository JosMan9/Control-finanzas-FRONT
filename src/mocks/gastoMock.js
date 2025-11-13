import { ingresoMock } from './ingresoMock.js';
import { tipoGastoMock } from './tipoGastoMock.js';
import { quincenaMock } from './quincenaMock.js';

export const gastoMock = [
    {
        id: 1,
        concepto: 'Compra de supermercado',
        fecha: '2024-01-15',
        esCubierto: true,
        ingreso: ingresoMock[0],
        tipoGasto: tipoGastoMock[2],
        quincena: quincenaMock[0]
    },
    {
        id: 2,
        concepto: 'Pago de tarjeta de crédito',
        fecha: '2024-01-20',
        esCubierto: false,
        ingreso: ingresoMock[1],
        tipoGasto: tipoGastoMock[1],
        quincena: quincenaMock[0]
    },
    {
        id: 3,
        concepto: 'Gasolina',
        fecha: '2024-01-25',
        esCubierto: true,
        ingreso: ingresoMock[0],
        tipoGasto: tipoGastoMock[2],
        quincena: quincenaMock[1]
    }
];

