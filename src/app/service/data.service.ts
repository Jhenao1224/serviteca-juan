import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Vehiculo } from "../modelo/vehiculo.model";
import { Cliente } from "../modelo/cliente.model";


@Injectable()
export class DataService {
    constructor(private httpClient: HttpClient) { }

    clientes: Cliente[] = [];
    vehiculos: Vehiculo[] = [];
    ordenes: any[] = [];

    obtenerClientes(){
        return this.httpClient.get<Cliente[]>('https://serviteca-9b8b4-default-rtdb.firebaseio.com/clientes.json');
    }

    setearDatosCliente(clientes: Cliente){
        this.obtenerClientes()
            .subscribe(
                (clientesGet: Cliente[]=[]) => { this.clientes = clientesGet;
                    this.clientes.push(clientes)
                    this.guardarClientes(clientesGet)
                }
            );
    }

    guardarClientes(clientes: Cliente[]) {
        this.httpClient.put('https://serviteca-9b8b4-default-rtdb.firebaseio.com/.json', this.clientes)
            .subscribe(
                response => console.log("resultado de guardar personas: " + response),
                error => console.error("error guardar personas: " + error)
            );
    }

    obtenerVehiculos(){
        return this.httpClient.get<Vehiculo[]>('https://serviteca-9b8b4-default-rtdb.firebaseio.com/vehiculos.json');
    }

    setearDatosVehiculo(vehiculos: Vehiculo){
        this.obtenerVehiculos()
            .subscribe(
                (vehiculosGet: Vehiculo[]=[]) => { this.vehiculos = vehiculosGet;
                    this.vehiculos.push(vehiculos)
                    this.guardarVehiculos(vehiculosGet)
                }
            );
    }

    guardarVehiculos(vehiculos: Vehiculo[]) {
        this.httpClient.put('https://serviteca-9b8b4-default-rtdb.firebaseio.com/vehiculos.json', vehiculos)
            .subscribe(
                response => console.log("resultado de guardar personas: " + response),
                error => console.error("error guardar personas: " + error)
            );
    }

    obtenerServicios(){
        return this.httpClient.get<any>('https://serviteca-9b8b4-default-rtdb.firebaseio.com/servicios.json');
    }

    obtenerOrdenes(){
        return this.httpClient.get<any>('https://serviteca-9b8b4-default-rtdb.firebaseio.com/ordenes.json');
    }

    setearOrdenes(ordenes: any){
        this.obtenerOrdenes()
            .subscribe(
                (ordenesGet: any[] = []) => { this.ordenes = ordenesGet;
                    this.ordenes.push(...ordenes)
                    this.guardarOrden(ordenesGet)
                }
            );

    }

    guardarOrden(orden: any){
        this.httpClient.put('https://serviteca-9b8b4-default-rtdb.firebaseio.com/ordenes.json', orden)
            .subscribe(
                response => console.log("resultado de guardar personas: " + response),
                error => console.error("error guardar personas: " + error)
            );
    }




}
