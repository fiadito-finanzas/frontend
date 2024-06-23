import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { CrearCuentaCorrienteComponent } from './components/crear-cuenta-corriente/crear-cuenta-corriente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { DeudasmensualesComponent } from './components/deudasmensuales/deudasmensuales.component';
import { TransaccionesCuentacorrienteComponent } from './components/transacciones-cuentacorriente/transacciones-cuentacorriente.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListaTransaccionesComponent } from './components/lista-transacciones/lista-transacciones.component';
import { TransaccionesEstablecimientoComponent } from './components/transacciones-establecimiento/transacciones-establecimiento.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'detalle-cliente/:id',
    component: DetalleClienteComponent
  },
  {
    path:'crear-cuenta-corriente/:id',
    component: CrearCuentaCorrienteComponent
  },
  {
    path:'crear-cliente',
    component: CrearClienteComponent
  },
  {
    path:'deudas-mensuales/:cuentaCorrienteId', component: DeudasmensualesComponent
  },
  {
    path:'transacciones/:cuentaCorrienteId', component: TransaccionesCuentacorrienteComponent
  },
  {
    path: 'productos', component: ListaProductosComponent
  },
  {
    path: 'crear-producto', component: CrearProductoComponent
  },
  {
    path: 'lista-transacciones', component: TransaccionesEstablecimientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
