import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './services/tokeninterceptor';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { MatIcon, MatIconModule} from '@angular/material/icon';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { CrearCuentaCorrienteComponent } from './components/crear-cuenta-corriente/crear-cuenta-corriente.component';
import { ClienteCuentacorrienteComponent } from './components/cliente-cuentacorriente/cliente-cuentacorriente.component';
import { ListaTransaccionesComponent } from './components/lista-transacciones/lista-transacciones.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component'; // Importa MatIconModule
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrarTransaccionComponent } from './components/registrar-transaccion/registrar-transaccion.component';
import { RegistrarPagoComponent } from './components/registrar-pago/registrar-pago.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { EditarCuentaCorrienteComponent } from './components/editar-cuenta-corriente/editar-cuenta-corriente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { DeudasmensualesComponent } from './components/deudasmensuales/deudasmensuales.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatPseudoCheckbox } from '@angular/material/core';
import { TransaccionesCuentacorrienteComponent } from './components/transacciones-cuentacorriente/transacciones-cuentacorriente.component';
import { CuotasComponent } from './components/cuotas/cuotas.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransaccionesEstablecimientoComponent } from './components/transacciones-establecimiento/transacciones-establecimiento.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    DetalleClienteComponent,
    CrearCuentaCorrienteComponent,
    ClienteCuentacorrienteComponent,
    ListaTransaccionesComponent,
    EditarClienteComponent,
    RegistrarTransaccionComponent,
    RegistrarPagoComponent,
    EditarCuentaCorrienteComponent,
    CrearClienteComponent,
    DeudasmensualesComponent,
    TransaccionesCuentacorrienteComponent,
    CuotasComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    TransaccionesEstablecimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
