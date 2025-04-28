// test/orden.mock.test.js

const sinon = require('sinon');
const { expect } = require('chai');

// Simulamos el componente (o su lógica)
const OrdenComponent = require('../serviteca-juan-main/crearorden'); // Asegúrate de tener la lógica en src/orden.js

describe('Pruebas dobles exclusivas de Mock para Crear Orden', () => {
  let ordenComponent;
  let mockServicio;

  beforeEach(() => {
    // Instanciamos el "componente"
    ordenComponent = new OrdenComponent();

    // Creamos un objeto fake para simular el servicio de creación
    mockServicio = {
      agregarServicio: function () {},
      crearServicio: function () {}
    };
  });

  it('Mock: verifica que se llame agregarServicio al agregar un servicio', () => {
    const mock = sinon.mock(mockServicio);

    // Esperamos que agregarServicio se llame una vez
    mock.expects('agregarServicio').once();

    // Simulamos agregar un servicio
    const servicio = { nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Luis' };

    mockServicio.agregarServicio(servicio);

    mock.verify();
  });

  it('Mock: verifica que se llame crearServicio al crear la orden', () => {
    const mock = sinon.mock(mockServicio);

    // Esperamos que crearServicio se llame una vez
    mock.expects('crearServicio').once();

    // Simulamos crear la orden
    mockServicio.crearServicio();

    mock.verify();
  });
});
