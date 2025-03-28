import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Cliente } from '../modelo/cliente.model';
import { Vehiculo } from '../modelo/vehiculo.model';
import { OrdenService } from '../service/orden.servicio';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit{

  servicios: any;
  vehiculos: Vehiculo[] = [];
  vehiculo: string = "";
  orden: any[] = []
  ordenTemporal:any[] = []

  constructor(private dataService: DataService, 
    private ordenServicio: OrdenService){}

   ngOnInit(): void {
    this.dataService.obtenerVehiculos()
      .subscribe(
        (vehiculos: Vehiculo[]=[]) => { this.vehiculos = vehiculos;}
      );

    this.dataService.obtenerServicios()
    .subscribe(
        (servicios: any) => {this.servicios = servicios;}
    );
  }

  agregarServicio(servicio: any){
    this.ordenTemporal.push(servicio);
  }

  crearServicio(){
    this.ordenTemporal.push(this.vehiculo)
    this.orden.push(this.ordenTemporal)
    this.ordenServicio.guardarOrden(this.orden)
  }

}
