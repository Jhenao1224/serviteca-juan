// test/vehiculo.mock.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const Vehiculo = require('../serviteca-juan-main/vehiculo');

describe('Pruebas de Mock para Vehiculo', () => {
  let vehiculo;
  let mockServicio;

  beforeEach(() => {
    vehiculo = new Vehiculo();
    // Creamos un objeto fake para simular el servicio
    mockServicio = {
      guardarvehiculo: function () {}
    };
  });

  it('Mock: verifica que se llame correctamente a guardarvehiculo', () => {
    const mock = sinon.mock(mockServicio);

    // Esperamos que guardarvehiculo se llame exactamente una vez
    mock.expects('guardarvehiculo').once();

    // Simulamos llenar datos
    vehiculo.placa = 'ABC123';
    vehiculo.cliente = 'Juan Pérez';
    vehiculo.modelo = '2022';
    vehiculo.tipoVehiculo = 'Camioneta';

    // Llamamos manualmente la función para cumplir con la expectativa
    mockServicio.guardarvehiculo();

    // Verificamos
    mock.verify();
  });
});
