import { Injectable } from "@angular/core";
import { Vehiculo } from "../modelo/vehiculo.model";
import { DataService } from "./data.service";

@Injectable()
export class VehiculosService{

    constructor(private dataService: DataService){}

    guardarVehiculos(vehiculo: Vehiculo){
        this.dataService.setearDatosVehiculo(vehiculo)
    }

}