class OrdenComponent {
    constructor() {
      this.servicios = [];
    }
  
    listarServicios() {
      this.servicios = [
        { nombre: 'Cambio de aceite', precio: 100, tiempo: 2, operario: 'Juan' },
        { nombre: 'Revisión de frenos', precio: 150, tiempo: 3, operario: 'Carlos' },
      ];
    }
  
    agregarServicio(servicio) {
      this.servicios.push(servicio);
    }
  
    crearServicio() {
      console.log('Servicio creado:', this.servicios);
    }
  }
  
  module.exports = OrdenComponent;  
  