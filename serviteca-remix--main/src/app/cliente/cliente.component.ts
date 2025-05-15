import { Component } from '@angular/core';
import { Cliente } from '../modelo/cliente.model';
import { ClientesService } from '../service/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  cedula: number = 0;
  nombres: string = "";
  apellidos: string = "";
  fechaNacimiento: Date = new Date();

  constructor(private clientesService: ClientesService) {}

  guardarCliente() {
    // Validaciones básicas
    if (this.cedula === undefined){
      alert("❗ la cedula.");
      return;
    }
    if (this.nombres.trim() === ''){
      alert("❗ Todos los campos son obligatorios.");
      return;
    }
    if (this.apellidos.trim() === '') {
      alert("❗ Todos los campos son obligatorios.");
      return;
    }

    if (this.cedula <= 9999) {
    alert("⚠️ La cedula es invalida");
    return;
  }


    const cliente = new Cliente(this.cedula, this.nombres, this.apellidos, this.fechaNacimiento);

    // Obtener clientes actuales, agregar el nuevo y guardar todos
    this.clientesService.obtenerClientes().subscribe((clientesGet: Cliente[] = []) => {
      clientesGet.push(cliente);

      this.clientesService.guardarClientes(clientesGet).subscribe({
        next: () => alert("✅ Cliente guardado correctamente."),
        error: () => alert("❌ Error al guardar el cliente.")
      });
    });
  }
}
