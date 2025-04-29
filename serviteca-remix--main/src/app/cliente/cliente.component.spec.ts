import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteComponent } from './cliente.component';
import { FormsModule } from '@angular/forms'; // Te faltaba importar FormsModule
import { of } from 'rxjs';
import { ClientesService } from '../service/clientes.service'; // Import correcto del servicio
import { RouterTestingModule } from '@angular/router/testing';

// Mock del servicio
class MockClientesService {
  guardarclientes() {
    return of(null);
  }
}

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clientesService: ClientesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [{ provide: ClientesService, useClass: MockClientesService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    clientesService = TestBed.inject(ClientesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.cedula).toBe(0);
    expect(component.nombres).toBe('');
    expect(component.apellidos).toBe('');
    expect(component.fechaNacimiento).toBeInstanceOf(Date);
  });

  it('should call guardarCliente() and invoke ClientesService', () => {
    spyOn(clientesService, 'guardarclientes').and.callThrough();
    component.cedula = 12345;
    component.nombres = 'Juan';
    component.apellidos = 'Pérez';
    component.fechaNacimiento = new Date('2000-01-01');

    component.guardarCliente();

    expect(clientesService.guardarclientes).toHaveBeenCalled();
  });
});
