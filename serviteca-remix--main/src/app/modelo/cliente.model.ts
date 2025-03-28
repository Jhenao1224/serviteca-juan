export class Cliente {
    cedula: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;

    constructor(cedula: number, nombres: string, apellidos: string, fechaNacimiento: Date){        
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
    }
}