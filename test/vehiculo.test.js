// test/vehiculo.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const Vehiculo = require('../serviteca-juan-main/vehiculo');


describe('Pruebas dobles de vehiculo', () => {
  let vehiculo;
  let servicioVehiculo;

  beforeEach(() => {
    vehiculo = new Vehiculo();

    // Stub para simular el servicio externo
    servicioVehiculo = {
      guardar: sinon.stub()
    };
  });

  it('usa un Dummy para pasar un cliente sin lógica adicional', () => {
    const dummyCliente = '1234567890';

    vehiculo.setDatos({
      placa: 'ABC123',
      modelo: 2022,
      cliente: dummyCliente,
      tipo: 'Sedan'
    });

    servicioVehiculo.guardar.returns('Vehiculo guardado exitosamente');

    const resultado = vehiculo.guardarVehiculos(servicioVehiculo);

    expect(resultado).to.equal('Vehiculo guardado exitosamente');
  });

  it('usa un Fake para probar lógica sin guardar en base real', () => {
    const fakeServicio = {
      guardar: function (vehiculo) {
        return `Vehiculo ${vehiculo.placa} guardado fake`;
      }
    };

    vehiculo.setDatos({
      placa: 'XYZ789',
      modelo: 2021,
      cliente: '9876543210',
      tipo: 'Campero'
    });

    const resultado = vehiculo.guardarVehiculos(fakeServicio);

    expect(resultado).to.equal('Vehiculo XYZ789 guardado fake');
  });

  it('usa un Stub para simular la respuesta de guardar', () => {
    servicioVehiculo.guardar.returns('Guardado con stub');

    vehiculo.setDatos({
      placa: 'AAA111',
      modelo: 2020,
      cliente: '1122334455',
      tipo: 'Sedan'
    });

    const resultado = vehiculo.guardarVehiculos(servicioVehiculo);

    expect(resultado).to.equal('Guardado con stub');
  });

  it('usa un Spy para verificar si se llamó a guardar', () => {
    const spyServicio = {
      guardar: sinon.spy()
    };

    vehiculo.setDatos({
      placa: 'BBB222',
      modelo: 2023,
      cliente: '9988776655',
      tipo: 'Campero'
    });

    vehiculo.guardarVehiculos(spyServicio);

    expect(spyServicio.guardar.calledOnce).to.be.true;
    expect(spyServicio.guardar.firstCall.args[0]).to.include({ placa: 'BBB222' });
  });

  it('retorna mensaje si falta algún campo (Dummy incompleto)', () => {
    vehiculo.setDatos({
      placa: '',
      modelo: 2022,
      cliente: '',
      tipo: 'Sedan'
    });

    const resultado = vehiculo.guardarVehiculos(servicioVehiculo);

    expect(resultado).to.equal('Todos los campos son obligatorios');
  });
});
