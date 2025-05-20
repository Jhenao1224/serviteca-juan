import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../service/vehiculos.service';
import { Vehiculo } from '../modelo/vehiculo.model';
import { Cliente } from '../modelo/cliente.model';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router'; // ✅ Importar Router

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  placa: string = '';
  modelo: number = 0;
  clientes: Cliente[] = [];
  mensaje: string = '';
  mensajeTipo: 'success' | 'error' = 'success';

  constructor(
    private vehiculoService: VehiculosService,
    private dataService: DataService,
    private router: Router // ✅ Inyectar Router
  ) {}

  ngOnInit(): void {
    this.dataService.obtenerClientes().subscribe(
      (clientes: Cliente[] = []) => {
        this.clientes = clientes;
      }
    );
  }

  guardarVehiculos() {
    let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
    let cliente = Number((<HTMLInputElement>document.getElementById("cliente")).value);

    this.placa = this.placa.trim().toUpperCase();

    // Validaciones
    if (this.placa === '' || !/^[A-Z]{3}\d{3}$/.test(this.placa)) {
      this.mensaje = "⚠️ Ingrese una placa correcta";
      this.mensajeTipo = 'error';
      return;
    }

    if (this.modelo === null || this.modelo === undefined || isNaN(this.modelo)) {
      this.mensaje = "⚠️ El modelo es obligatorio.";
      this.mensajeTipo = 'error';
      return;
    }

    if (this.modelo <= 1950) {
      this.mensaje = "⚠️ El modelo es inválido.";
      this.mensajeTipo = 'error';
      return;
    }

    if (tipo.trim() === '') {
      this.mensaje = "⚠️ Selecciona un tipo de vehículo.";
      this.mensajeTipo = 'error';
      return;
    }

    if (isNaN(cliente) || cliente <= 0) {
      this.mensaje = "⚠️ Selecciona un cliente válido.";
      this.mensajeTipo = 'error';
      return;
    }

    this.dataService.obtenerVehiculos().subscribe((vehiculosGet: Vehiculo[] = []) => {
      const placaExiste = vehiculosGet.some(v => v.placa.toUpperCase() === this.placa);

      if (placaExiste) {
        this.mensaje = "⚠️ Ya existe un vehículo con esa placa.";
        this.mensajeTipo = 'error';
        return;
      }

      let vehiculo = new Vehiculo(this.placa, this.modelo, tipo, cliente);
      vehiculosGet.push(vehiculo);

      this.dataService.guardarVehiculos(vehiculosGet).subscribe({
        next: () => {
          this.mensaje = "✅ Vehículo registrado correctamente.";
          this.mensajeTipo = 'success';
          this.placa = '';
          this.modelo = 0;

          // ✅ Redirigir después de 1.5 segundos
          setTimeout(() => {
            this.router.navigate(['/crearorden']);
          }, 1500);
        },
        error: () => {
          this.mensaje = "❌ Error al registrar el vehículo.";
          this.mensajeTipo = 'error';
        }
      });
    });
  }
}
