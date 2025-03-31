import { Injectable, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClientesService {

    constructor(private dataService: DataService){}

    obtenerClientes(){
        this.dataService.obtenerClientes()  
    }

    guardarclientes(cliente: Cliente){
        this.dataService.setearDatosCliente(cliente)
    }

}