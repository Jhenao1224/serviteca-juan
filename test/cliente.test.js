// test/cliente.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const Cliente = require('../serviteca-juan-main/cliente');

describe('Pruebas dobles para Cliente', () => {
  let cliente;
  let servicio;

  beforeEach(() => {
    cliente = new Cliente();
    servicio = {
      guardar: sinon.stub()
    };
  });

  it('usa un Dummy para pasar valores sin lógica adicional', () => {
    const dummyNombre = 'Pedro';
    cliente.setDatos({
      cedula: 123,
      nombres: dummyNombre,
      apellidos: 'Pérez',
      fechaNacimiento: new Date('1990-01-01')
    });

    servicio.guardar.returns('Cliente guardado exitosamente');

    const resultado = cliente.guardarCliente(servicio);
    expect(resultado).to.equal('Cliente guardado exitosamente');
  });

  it('usa un Fake para probar sin base de datos real', () => {
    const fakeServicio = {
      guardar: function (cli) {
        return `Cliente ${cli.nombres} guardado fake`;
      }
    };

    cliente.setDatos({
      cedula: 456,
      nombres: 'Lucía',
      apellidos: 'Ramírez',
      fechaNacimiento: new Date('1985-05-15')
    });

    const resultado = cliente.guardarCliente(fakeServicio);
    expect(resultado).to.equal('Cliente Lucía guardado fake');
  });

  it('usa un Stub para simular la respuesta del servicio', () => {
    servicio.guardar.returns('Guardado con stub');

    cliente.setDatos({
      cedula: 789,
      nombres: 'Carlos',
      apellidos: 'Gómez',
      fechaNacimiento: new Date('1992-07-20')
    });

    const resultado = cliente.guardarCliente(servicio);
    expect(resultado).to.equal('Guardado con stub');
  });

  it('usa un Spy para verificar la llamada al método guardar', () => {
    const spyServicio = {
      guardar: sinon.spy()
    };

    cliente.setDatos({
      cedula: 101,
      nombres: 'Ana',
      apellidos: 'Torres',
      fechaNacimiento: new Date('2000-12-12')
    });

    cliente.guardarCliente(spyServicio);

    expect(spyServicio.guardar.calledOnce).to.be.true;
    expect(spyServicio.guardar.firstCall.args[0]).to.include({ nombres: 'Ana' });
  });

  it('retorna mensaje si falta algún campo', () => {
    cliente.setDatos({
      cedula: 0,
      nombres: '',
      apellidos: '',
      fechaNacimiento: ''
    });

    const resultado = cliente.guardarCliente(servicio);
    expect(resultado).to.equal('Todos los campos son obligatorios');
  });
});
