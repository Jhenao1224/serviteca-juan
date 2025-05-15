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

  guardarVehiculos() {
  let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
  let cliente = Number((<HTMLInputElement>document.getElementById("cliente")).value);

  // Validaciones
  if (this.placa.trim() === '') {
    alert("⚠️ La placa es obligatoria.");
    return;
  }

   if (this.modelo === null || this.modelo === undefined || isNaN(this.modelo)) {
    alert("⚠️ El modelo es obligatorio.");
    return;
  }

  if (this.modelo <= 1950) {
    alert("⚠️ El modelo invalido.");
    return;
  }

  if (tipo.trim() === '') {
    alert("⚠️ Debes seleccionar un tipo de vehículo.");
    return;
  }

  if (isNaN(cliente) || cliente <= 0) {
    alert("⚠️ Debes seleccionar un cliente válido.");
    return;
  }

  // Si pasa validación, continuar
  let vehiculo = new Vehiculo(this.placa, this.modelo, tipo, cliente);

  this.dataService.obtenerVehiculos().subscribe((vehiculosGet: Vehiculo[] = []) => {
    vehiculosGet.push(vehiculo);

    this.dataService.guardarVehiculos(vehiculosGet).subscribe({
      next: () => {
        alert("✅ Vehículo registrado correctamente.");
        this.placa = '';
        this.modelo = 0;
      },
      error: () => {
        alert("❌ Error al registrar el vehículo.");
      }
    });
  });
}




}
