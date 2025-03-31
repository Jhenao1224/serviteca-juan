import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiculosService } from './service/vehiculos.service';
import { DataService } from './service/data.service';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientesService } from './service/clientes.service';
import { OrdenComponent } from './orden/orden.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { OrdenService } from './service/orden.servicio';

@NgModule({
  declarations: [
    AppComponent,
    VehiculoComponent,
    ClienteComponent,
    OrdenComponent,
    CrearOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VehiculosService, ClientesService, DataService, OrdenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
