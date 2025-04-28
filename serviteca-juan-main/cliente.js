// cliente.js

class Cliente {
    constructor() {
      this.cedula = 0;
      this.nombres = '';
      this.apellidos = '';
      this.fechaNacimiento = new Date();
    }
  
    setDatos(datos) {
      this.cedula = datos.cedula;
      this.nombres = datos.nombres;
      this.apellidos = datos.apellidos;
      this.fechaNacimiento = datos.fechaNacimiento;
    }
  
    guardarCliente(servicio) {
      if (!this.cedula || !this.nombres || !this.apellidos || !this.fechaNacimiento) {
        return 'Todos los campos son obligatorios';
      }
      return servicio.guardar(this);
    }
  }
  
  module.exports = Cliente;
  