import { tarjetaMock } from './tarjetaMock.js';
import { gastoMock } from './gastoMock.js';
import { mesMock } from './mesMock.js';

export const gastoTarjetaMock = [
    {
        id: 1,
        mes: mesMock[3],
        mesActual: 1,
        mesFinal: 2,
        tarjeta: tarjetaMock[0],
        esMio: true,
        cantidadAbonada: 1500.00,
        gasto: gastoMock[0]
    },
    {
        id: 2,
        mes: mesMock[0],
        mesActual: 1,
        mesFinal: 1,
        tarjeta: tarjetaMock[1],
        esMio: false,
        cantidadAbonada: 2500.00,
        gasto: gastoMock[1]
    },
    {
        id: 3,
        mes: mesMock[1],
        mesActual: 2,
        mesFinal: 3,
        tarjeta: tarjetaMock[0],
        esMio: true,
        cantidadAbonada: 800.00,
        gasto: gastoMock[2]
    }
];

