import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoComponent } from 'src/app/vehiculo/vehiculo.component';
import { VehiculosService } from 'src/app/service/vehiculos.service';
import { DataService } from 'src/app/service/data.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from 'src/app/modelo/cliente.model';


// Mock del servicio VehiculosService
class MockVehiculosService {
  guardarVehiculos() {
    return throwError(() => new Error('La placa ya está registrada.'));
  }
}

// Mock del servicio DataService
class MockDataService {
  obtenerClientes() {
    return of([{
      cedula: 123,
      nombres: 'Juan',
      apellidos: 'Perez',
      fechaNacimiento: new Date('1990-01-01') // Añadido fechaNacimiento y apellidos
    }]);
  }
}

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let vehiculoService: VehiculosService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculoComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: VehiculosService, useClass: MockVehiculosService },
        { provide: DataService, useClass: MockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculosService);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not create vehicle if plate already exists', () => {
    // Simula un vehículo con placa registrada
    component.placa = 'ABC123';
    component.modelo = 2022;

    // Simula el cliente
    component.clientes = [{
      cedula: 123,
      nombres: 'Juan',
      apellidos: 'Perez',
      fechaNacimiento: new Date('1990-01-01')
    }];

    // Espía en el método guardarVehiculos
    spyOn(vehiculoService, 'guardarVehiculos').and.callThrough();

    // Llama a la función que maneja la creación del vehículo
    component.guardarVehiculos();

    // Verifica que el servicio fue llamado
    expect(vehiculoService.guardarVehiculos).toHaveBeenCalled();

    // Verifica que el mensaje de error sea el esperado
    fixture.detectChanges(); // Detecta los cambios en la vista

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent).toContain('La placa ya está registrada.');
  });
});
