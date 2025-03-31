import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculosService } from '../service/vehiculos.service';
import { DataService } from '../service/data.service';
import { of } from 'rxjs';
import { Cliente } from '../modelo/cliente.model';
import { Vehiculo } from '../modelo/vehiculo.model';

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let mockVehiculosService: jasmine.SpyObj<VehiculosService>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockVehiculosService = jasmine.createSpyObj('VehiculosService', ['guardarVehiculos']);
    mockDataService = jasmine.createSpyObj('DataService', ['obtenerClientes']);

    await TestBed.configureTestingModule({
      declarations: [VehiculoComponent],
      imports: [FormsModule],
      providers: [
        { provide: VehiculosService, useValue: mockVehiculosService },
        { provide: DataService, useValue: mockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.placa).toBe('');
    expect(component.modelo).toBe(0);
    expect(component.clientes).toEqual([]);
  });

  it('should call obtenerClientes and set clientes on ngOnInit', () => {
    const mockClientes: Cliente[] = [
      { cedula: 123456789, nombres: 'Juan', apellidos: 'Pérez', fechaNacimiento: new Date('1990-01-01') },
    ];
    mockDataService.obtenerClientes.and.returnValue(of(mockClientes));
    component.ngOnInit();
    expect(component.clientes).toEqual(mockClientes);
  });

  it('should call guardarVehiculos when invoked', () => {
    spyOn(document, 'getElementById').and.callFake((id: string) => {
      const input = document.createElement('input');
      input.value = id === 'tipo' ? 'Sedan' : '1';
      return input;
    });

    component.placa = 'ABC123';
    component.modelo = 2023;
    component.guardarVehiculos();

    expect(mockVehiculosService.guardarVehiculos).toHaveBeenCalledWith(
      jasmine.objectContaining({ placa: 'ABC123', modelo: 2023, tipo: 'Sedan', cliente: 1 })
    );
  });
});