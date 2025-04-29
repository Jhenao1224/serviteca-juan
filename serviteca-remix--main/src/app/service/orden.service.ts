import { Injectable } from "@angular/core";
import { Vehiculo } from "../modelo/vehiculo.model";
import { DataService } from "./data.service";

@Injectable()
export class OrdenService{

    constructor(private dataService: DataService){}

    guardarOrden(orden: any){
        //this.dataService.guardarOrden(orden)
        this.dataService.setearOrdenes(orden)
    }
    
}