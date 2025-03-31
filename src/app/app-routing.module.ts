import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OrdenComponent } from './orden/orden.component';
import { AppComponent } from './app.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';


const routes: Routes = [
  { path:'vehiculo', component: VehiculoComponent},
  { path:'cliente', component: ClienteComponent},
  { path:'orden', component: OrdenComponent},
  { path:'crearorden', component: CrearOrdenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
