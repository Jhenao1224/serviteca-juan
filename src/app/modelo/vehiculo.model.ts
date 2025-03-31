export class Vehiculo {
    placa: string;
    modelo: number;
    tipo: string;
    cliente: number

    constructor(placa: string, modelo: number, tipo: string, cliente: number){        
        this.placa = placa;
        this.modelo = modelo;
        this.tipo = tipo;
        this.cliente = cliente;
    }
}