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

  constructor(private clientesService: ClientesService,
    ){}


  guardarCliente(){
    let cliente = new Cliente(this.cedula, this.nombres, this.apellidos, this.fechaNacimiento);
    this.clientesService.guardarclientes(cliente)
  }


}
