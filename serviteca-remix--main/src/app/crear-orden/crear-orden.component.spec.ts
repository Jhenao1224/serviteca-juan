import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CrearOrdenComponent } from './crear-orden.component';
import { DataService } from '../service/data.service';
import { OrdenService } from '../service/orden.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockDataService {
  obtenerVehiculos() {
    return of([
      { placa: 'ABC123', tipo: 'Sedan' }
    ]);
  }
  obtenerServicios() {
    return of([
      { id: 1, nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Juan' }
    ]);
  }
}

class MockOrdenService {
  guardarOrden() {}
}

describe('CrearOrdenComponent', () => {
  let component: CrearOrdenComponent;
  let fixture: ComponentFixture<CrearOrdenComponent>;
  let dataService: DataService;
  let ordenService: OrdenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearOrdenComponent],
      imports: [FormsModule],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: OrdenService, useClass: MockOrdenService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]   // <--- ESTO ES LO QUE FALTABA
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOrdenComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    ordenService = TestBed.inject(OrdenService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.vehiculos.length).toBeGreaterThan(0);
    expect(component.servicios.length).toBeGreaterThan(0);
    expect(component.vehiculo).toBe('');
    expect(component.orden).toEqual([]);
    expect(component.ordenTemporal).toEqual([]);
  });

  it('should call agregarServicio and add a service to ordenTemporal', () => {
    const servicio = { id: 1, nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Juan' };
    component.agregarServicio(servicio);
    expect(component.ordenTemporal).toContain(servicio);
  });

  it('should call crearServicio and update orden', () => {
    spyOn(ordenService, 'guardarOrden');
    component.vehiculo = 'ABC123';
    component.ordenTemporal = [{ id: 1, nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Juan' }];
    component.crearServicio();
    expect(component.orden.length).toBe(1);
    expect(ordenService.guardarOrden).toHaveBeenCalledWith(component.orden);
  });

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Crear Orden');
  });
});
