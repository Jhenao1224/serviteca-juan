import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CrearOrdenComponent } from './crear-orden.component';
import { DataService } from '../service/data.service';
import { OrdenService } from '../service/orden.servicio';
import { of } from 'rxjs';

class MockDataService {
  obtenerVehiculos() {
    return of([]);
  }
  obtenerServicios() {
    return of([]);
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
      ]
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
    expect(component.vehiculos).toEqual([]);
    expect(component.servicios).toBeUndefined();
    expect(component.vehiculo).toBe('');
    expect(component.orden).toEqual([]);
    expect(component.ordenTemporal).toEqual([]);
  });

  it('should call agregarServicio and add a service to ordenTemporal', () => {
    const servicio = { id: 1, nombre: 'Cambio de aceite' };
    component.agregarServicio(servicio);
    expect(component.ordenTemporal).toContain(servicio);
  });

  it('should call crearServicio and update orden', () => {
    spyOn(ordenService, 'guardarOrden');
    component.vehiculo = 'VehiculoTest';
    component.ordenTemporal = [{ id: 1, nombre: 'Cambio de aceite' }];
    component.crearServicio();
    expect(component.orden.length).toBe(1);
    expect(ordenService.guardarOrden).toHaveBeenCalledWith(component.orden);
  });

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Crear Orden');
  });
});
