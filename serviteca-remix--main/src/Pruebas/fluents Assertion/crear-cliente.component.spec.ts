import { ClienteComponent } from 'src/app/cliente/cliente.component';
import { ClientesService } from 'src/app/service/clientes.service';
import { Cliente } from 'src/app/modelo/cliente.model';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let clientesServiceSpy: jasmine.SpyObj<ClientesService>;

  beforeEach(() => {
    clientesServiceSpy = jasmine.createSpyObj('ClientesService', ['guardarclientes']);
    component = new ClienteComponent(clientesServiceSpy);
  });

  it('debería lanzar una excepción y no guardar cliente si los campos obligatorios están vacíos', () => {
    component.cedula = 0;
    component.nombres = '';
    component.apellidos = '';
    component.fechaNacimiento = new Date('');


    expect(() => component.guardarCliente()).toThrowError('Todos los campos obligatorios deben ser llenados');
    expect(clientesServiceSpy.guardarclientes).not.toHaveBeenCalled();
  });
});
