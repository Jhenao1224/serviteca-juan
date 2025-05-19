import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/cliente.model';
import { ClientesService } from '../service/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cedula: number = 0;
  nombres: string = '';
  apellidos: string = '';
  fechaNacimiento: Date = new Date();

  mensaje: string = '';
  mensajeTipo: 'success' | 'error' = 'success';

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {}

  guardarCliente() {
    // Validaciones básicas
    if (!this.cedula || isNaN(this.cedula)) {
      this.mensaje = '⚠️ Ingrese una cédula válida.';
      this.mensajeTipo = 'error';
      return;
    }

    if (this.cedula <= 9999) {
      this.mensaje = '⚠️ La cédula es inválida.';
      this.mensajeTipo = 'error';
      return;
    }

    if (this.nombres.trim() === '' || this.apellidos.trim() === '') {
      this.mensaje = '⚠️ Todos los campos son obligatorios.';
      this.mensajeTipo = 'error';
      return;
    }

    // Validar fecha de nacimiento: mayor de 18 y menor de 100
    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();

    let edadExacta = edad;
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edadExacta--;
    }

    if (nacimiento > hoy) {
      this.mensaje = '⚠️ La fecha de nacimiento invalida.';
      this.mensajeTipo = 'error';
      return;
    }

    if (edadExacta < 18) {
      this.mensaje = '⚠️ El cliente debe tener al menos 18 años.';
      this.mensajeTipo = 'error';
      return;
    }

    if (edadExacta > 100) {
      this.mensaje = '⚠️ La fecha de nacimiento invalida.';
      this.mensajeTipo = 'error';
      return;
    }

    // Verificar si el cliente ya existe
    this.clientesService.obtenerClientes().subscribe((clientesGet: Cliente[] = []) => {
      const cedulaExiste = clientesGet.some(c => c.cedula === this.cedula);

      if (cedulaExiste) {
        this.mensaje = '⚠️ Cliente ya registrado, verifique la informacion';
        this.mensajeTipo = 'error';
        return;
      }

      const cliente = new Cliente(this.cedula, this.nombres.trim(), this.apellidos.trim(), nacimiento);
      clientesGet.push(cliente);

      this.clientesService.guardarClientes(clientesGet).subscribe({
        next: () => {
          this.mensaje = '✅ Cliente guardado correctamente.';
          this.mensajeTipo = 'success';
          this.cedula = 0;
          this.nombres = '';
          this.apellidos = '';
          this.fechaNacimiento = new Date();
        },
        error: () => {
          this.mensaje = '❌ Error al guardar el cliente.';
          this.mensajeTipo = 'error';
        }
      });
    });
  }
}
