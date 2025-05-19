import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearOrdenComponent } from 'src/app/crear-orden/crear-orden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenService } from 'src/app/service/orden.service';
import { DataService } from 'src/app/service/data.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Vehiculo } from 'src/app/modelo/vehiculo.model';

describe('CrearOrdenComponent', () => {
  let component: CrearOrdenComponent;
  let fixture: ComponentFixture<CrearOrdenComponent>;
  let ordenServiceSpy: jasmine.SpyObj<OrdenService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  const servicioMock = { id: 1, nombre: 'Cambio de aceite' };
  const vehiculoMock = { id: 1, modelo: 2014, placa: 'ABC123', tipo: 'Sedan',cliente: 1 }as Vehiculo;


  beforeEach(async () => {
    // Arrange: Configuramos los mocks para los servicios
    ordenServiceSpy = jasmine.createSpyObj('OrdenService', ['guardarOrden']);
    dataServiceSpy = jasmine.createSpyObj('DataService', ['obtenerVehiculos', 'obtenerServicios']);

    dataServiceSpy.obtenerVehiculos.and.returnValue(of([vehiculoMock]));
    dataServiceSpy.obtenerServicios.and.returnValue(of([servicioMock]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CrearOrdenComponent],
      providers: [
        { provide: OrdenService, useValue: ordenServiceSpy },
        { provide: DataService, useValue: dataServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOrdenComponent);
    component = fixture.componentInstance;
  });

  it('no debe permitir agregar el mismo servicio dos veces para el mismo vehículo', () => {
    // Arrange: Configuramos el componente y su orden temporal
    component.vehiculo = 'ABC123'; // Vehículo simulado
    component.agregarServicio(servicioMock); // Agregar el servicio por primera vez

    // Act: Intentamos agregar el mismo servicio otra vez
    component.agregarServicio(servicioMock);

    // Assert: Verificamos que solo haya un servicio agregado
    expect(component.ordenTemporal.length).toBe(1, 'El servicio no debe ser agregado dos veces');
    expect(component.ordenTemporal[0].id).toBe(servicioMock.id, 'El servicio agregado debe ser el mismo');

    // Verificamos que el sistema mostró un mensaje de alerta
    spyOn(window, 'alert');
    expect(window.alert).toHaveBeenCalledWith('Este servicio ya ha sido agregado para este vehículo.');
  });

  it('debe permitir agregar un servicio único para el mismo vehículo', () => {
    // Arrange: Agregar el primer servicio
    component.vehiculo = 'ABC123';
    component.agregarServicio(servicioMock);

    // Crear un nuevo servicio simulado
    const otroServicioMock = { id: 2, nombre: 'Revisión técnica' };

    // Act: Agregar el nuevo servicio
    component.agregarServicio(otroServicioMock);

    // Assert: Verificamos que ahora haya dos servicios en ordenTemporal
    expect(component.ordenTemporal.length).toBe(2, 'Debe permitir agregar servicios únicos');
    expect(component.ordenTemporal[1].id).toBe(otroServicioMock.id, 'El nuevo servicio debe ser agregado correctamente');
  });

  it('debe registrar la orden correctamente si los servicios son únicos', () => {
    // Arrange: Simulamos la adición de dos servicios únicos
    component.vehiculo = 'ABC123';
    component.agregarServicio(servicioMock);
    const otroServicioMock = { id: 2, nombre: 'Revisión técnica' };
    component.agregarServicio(otroServicioMock);

    // Act: Crear la orden
    component.crearServicio();

    // Assert: Verificamos que se haya llamado al servicio para guardar la orden
    expect(ordenServiceSpy.guardarOrden).toHaveBeenCalled();
    expect(ordenServiceSpy.guardarOrden).toHaveBeenCalledWith([component.ordenTemporal]);
  });
});
