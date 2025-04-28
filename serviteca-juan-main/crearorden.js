// src/orden.js

class OrdenComponent {
    constructor() {
      this.vehiculo = null;
      this.servicios = [];
      this.ordenTemporal = [];
    }
  
    agregarServicio(servicio) {
      this.ordenTemporal.push(servicio);
    }
  
    crearServicio() {
      console.log('Orden creada:', this.ordenTemporal);
    }
  }
  
  module.exports = OrdenComponent;
  