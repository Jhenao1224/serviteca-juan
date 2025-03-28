import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../service/vehiculos.service';
import { Vehiculo } from '../modelo/vehiculo.model';
import { Cliente } from '../modelo/cliente.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit{

  placa: string = "";
  modelo: number = 0;
  clientes: Cliente[] = [];

  constructor(private vehiculoService: VehiculosService,
    private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.obtenerClientes()
    .subscribe(
        (clientes: Cliente[]=[]) => { this.clientes = clientes;}
    );
  }

  guardarVehiculos(){
    let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
    let cliente = Number((<HTMLInputElement>document.getElementById("cliente")).value);
    let vehiculo = new Vehiculo(this.placa, this.modelo, tipo, cliente)
    this.vehiculoService.guardarVehiculos(vehiculo);
  }
  

}
