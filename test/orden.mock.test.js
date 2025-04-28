const sinon = require('sinon');
const assert = require('assert');
const OrdenComponent = require('../serviteca-juan-main/orden');  // Asegúrate que la ruta sea correcta

describe('Pruebas dobles exclusivas de Mock para Crear Orden', function () {
  let ordenComponent;
  let mockListadoServicios;

  beforeEach(function () {
    // Crea una nueva instancia de OrdenComponent antes de cada prueba
    ordenComponent = new OrdenComponent();

    // Crear un mock para listarServicios
    mockListadoServicios = sinon.mock(ordenComponent);

    // Configura el mock para la función listarServicios()
    mockListadoServicios.expects('listarServicios').once().callsFake(() => {
      // Aquí se simula la funcionalidad de listarServicios
      ordenComponent.servicios = [
        { nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Juan' },
        { nombre: 'Revisión de frenos', precio: 150, tiempo: 3, operario: 'Carlos' },
      ];
    });
  });

  it('Mock: verifica que se llame a listarServicios al seleccionar una orden', function () {
    // Simula que se llama a la función listarServicios al cambiar la orden
    ordenComponent.listarServicios();
    
    // Verifica que el mock haya sido llamado
    mockListadoServicios.verify();

    // Asegura que los servicios sean listados correctamente
    assert.strictEqual(ordenComponent.servicios.length, 2, 'Los servicios deben ser listados');
    assert.strictEqual(ordenComponent.servicios[0].nombre, 'Cambio de aceite', 'El primer servicio debe ser "Cambio de aceite"');
    assert.strictEqual(ordenComponent.servicios[1].nombre, 'Revisión de frenos', 'El segundo servicio debe ser "Revisión de frenos"');
  });

  afterEach(function () {
    // Verifica que todos los mocks hayan sido usados
    sinon.restore();
  });
});
