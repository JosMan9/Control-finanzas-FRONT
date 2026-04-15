import { quincenaMock } from './quincenaMock.js';
import { periodicidadMock } from './periodicidadMock.js';

export const ingresoMock = [
    {
        id: 1,
        nombre: 'REV-4822',
        monto: 15000,
        quincena: quincenaMock[0],
        periodicidad: periodicidadMock[1]
    },
    {
        id: 2,
        nombre: 'SUB-9910',
        monto: 5000,
        quincena: quincenaMock[1],
        periodicidad: periodicidadMock[0]
    }
];
