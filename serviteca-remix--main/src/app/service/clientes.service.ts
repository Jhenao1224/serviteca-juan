import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Cliente } from "../modelo/cliente.model";
import { Observable } from "rxjs";

@Injectable()
export class ClientesService {
  constructor(private dataService: DataService) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.dataService.obtenerClientes();
  }

  guardarClientes(clientes: Cliente[]): Observable<any> {
    return this.dataService.guardarClientes(clientes);
  }
}
