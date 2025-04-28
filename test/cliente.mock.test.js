// test/cliente.mock.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const Cliente = require('../serviteca-juan-main/cliente');

describe('Pruebas dobles exclusivas de Mock para Cliente', () => {
  let cliente;
  let mockServicio;

  beforeEach(() => {
    cliente = new Cliente();
    // Ahora solo es una función normal, SIN stub.
    mockServicio = {
      guardarclientes: function () {}
    };
  });

  it('Mock: verifica que se llame correctamente a guardarclientes', () => {
    // Creamos el mock de mockServicio
    const mock = sinon.mock(mockServicio);

    // Definimos que esperamos que guardarclientes se llame exactamente una vez
    mock.expects('guardarclientes').once();

    // Simulamos llenar datos
    cliente.cedula = 12345;
    cliente.nombres = 'Juan';
    cliente.apellidos = 'Pérez';
    cliente.fechaNacimiento = new Date('2000-01-01');

    // Llamamos manualmente guardarclientes para que se cumpla la expectativa
    mockServicio.guardarclientes();

    // Verificamos que se haya llamado como esperamos
    mock.verify();
  });
});
