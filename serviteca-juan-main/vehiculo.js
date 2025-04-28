
class Vehiculo {
    constructor() {
      this.placa = '';
      this.modelo = '';
      this.cliente = '';
      this.tipo = '';
    }
  
    setDatos(datos) {
      this.placa = datos.placa;
      this.modelo = datos.modelo;
      this.cliente = datos.cliente;
      this.tipo = datos.tipo;
    }
  
    guardarVehiculos(servicio) {
      if (!this.placa || !this.modelo || !this.cliente || !this.tipo) {
        return 'Todos los campos son obligatorios';
      }
      return servicio.guardar({
        placa: this.placa,
        modelo: this.modelo,
        cliente: this.cliente,
        tipo: this.tipo
      });
    }
  }
  
  module.exports = Vehiculo; 
  