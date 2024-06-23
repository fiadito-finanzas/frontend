import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CuentacorrienteService } from 'src/app/services/cuentacorriente.service';
import { MatDialog } from '@angular/material/dialog';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { PagosService } from 'src/app/services/pagos.service';
import { Observable } from 'rxjs';
import { CuotasService } from 'src/app/services/cuotas.service';
import { DeudamensualService } from 'src/app/services/deudamensual.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {
  cliente: any;
  clienteId: any;
  cuentaCorriente: any;
  mostrarEditarCliente: boolean = false;
  mostrarNotificacion: boolean = false;
  mostrarModal: boolean = false;
  mostrarModalPago: boolean = false;
  notificacionMensaje: any;
  deudaMensual: any;
  cuotas: any;
  @ViewChild('confirmacionEliminarCliente') confirmacionEliminarClienteTemplate!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientesService,
    private router: Router,
    private dialog: MatDialog,
    private cuentaCorrienteService: CuentacorrienteService,
    private transaccionService: TransaccionesService,
    private pagoService: PagosService,
    private cuotaService: CuotasService,
    private deudaService: DeudamensualService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = params.get('id');
      this.obtenerCliente();
      this.obtenerCuentaCorriente(); // Llamada para obtener la cuenta corriente al iniciar
      
    });
  }

  obtenerCliente(): void {
    this.clienteService.obtenerCliente(this.clienteId).subscribe(
      (response: any) => {
        console.info(response);
        this.cliente = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  crearCuentaCorriente(clienteId: any): void {
    this.router.navigate(['/crear-cuenta-corriente', clienteId]);
  }

  obtenerCuentaCorriente(): void {
    this.cuentaCorrienteService.obtenerCuentaCorrientePorCliente(this.clienteId).subscribe(
      (response: any) => {
        console.info('Cuenta corriente del cliente:', response);
        this.cuentaCorriente = response;
        console.log('Cuenta corriente:', this.cuentaCorriente);
        this.obtenerDeudaMensual(this.cuentaCorriente.id);
      },
      (error: any) => {
        console.error('Error al obtener cuenta corriente:', error);
      }
    );
  }

  confirmarEliminacion(): void {
    const dialogRef = this.dialog.open(this.confirmacionEliminarClienteTemplate);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.eliminarCliente();
      }
    });
  }

  cancelarEliminar(): void {
    this.dialog.closeAll();
  }

  eliminarCliente(): void {
    this.clienteService.eliminarCliente(this.clienteId).subscribe(
      (response: any) => {
        console.log('Cliente eliminado:', response);
        // Implementar notificación de éxito aquí si es necesario
        // Redirigir a la lista de clientes u otra página
      },
      (error: any) => {
        console.error('Error al eliminar cliente:', error);
        // Implementar notificación de error aquí si es necesario
      }
    );
  }

  mostrarEditarModal(): void {
    this.mostrarEditarCliente = true;
  }

  cerrarEditarModal(): void {
    this.mostrarEditarCliente = false;
  }

    mostrarModalRegistrarTransaccion(): void {
    this.mostrarModal = true;
  }
  cerrarModalRegistrarTransaccion(): void {
    this.mostrarModal = false;
  }

  mostrarModalRegistrarPago(): void {
    this.mostrarModalPago = true;
  }
  cerrarModalRegistrarPago(): void {
    this.mostrarModalPago = false;
  }

  guardarCambiosCliente(clienteEditado: any): void {
    // Lógica para guardar los cambios del cliente
    this.clienteService.editarCliente(this.cliente).subscribe(
      (response: any) => {
        console.log('Cliente editado:', response);
        this.mostrarNotificacion = true;
        this.notificacionMensaje = 'Cliente editado correctamente';
      },
      (error: any) => {
        console.error('Error al editar cliente:', error);
        this.mostrarNotificacion = true;

        this.notificacionMensaje = 'Error al editar cliente';
      }
    );
    this.mostrarEditarCliente = false; // Cierra el modal de edición
  }

  cerrarNotificacion(): void {
    this.mostrarNotificacion = false;
  }

  registrarTransaccion(transaccion: any): void {
    // Aquí puedes agregar la lógica para procesar la transacción
    console.log('Transacción registrada:', transaccion);
    // Ejemplo de lógica para actualizar datos o enviar a un servicio
    this.transaccionService.registrarTransaccion(transaccion).subscribe(
      (response: any) => {
        console.info('Transacción registrada exitosamente:', response);
        // Aquí podrías mostrar una notificación de éxito si lo deseas
      },
      (error: any) => {
        console.error('Error al registrar transacción:', error);
        // Aquí podrías mostrar una notificación de error si lo deseas
      }
    );
    this.cerrarModalRegistrarTransaccion();
  }

  registrarPago(pago: any): void {
    // Aquí puedes agregar la lógica para procesar el pago
    console.log('Pago registrado:', pago);
    // Ejemplo de lógica para actualizar datos o enviar a un servicio
    this.pagoService.registrarPago(pago).subscribe(
      (response: any) => {
        console.info('Pago registrado exitosamente:', response);
        // Aquí podrías mostrar una notificación de éxito si lo deseas
      },
      (error: any) => {
        console.error('Error al registrar pago:', error);
        // Aquí podrías mostrar una notificación de error si lo deseas
      }
    );
    this.cerrarModalRegistrarPago();
  }

  obtenerDeudaMensual(cuentaCorrienteId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Cuenta corriente ID:', cuentaCorrienteId);
      this.deudaService.obtenerDeudaMensualActual(cuentaCorrienteId).subscribe(
        (response: any) => {
          console.info('Deuda mensual actual:', response);
          this.deudaMensual = response;
          this.obtenerCuotas(this.deudaMensual.id);
          resolve(response);
        },
        (error: any) => {
          console.error('Error al obtener deuda mensual:', error);
          reject(error);
        }
      );
    });
  }



  
  obtenerCuotas(deudaMensualId:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuotaService.obtenerCuotasPorDeudaMensual(deudaMensualId).subscribe(
        (response: any) => {
          console.info('Cuotas de la cuenta corriente:', response);
          this.cuotas = response;
          resolve(response);
        },
        (error: any) => {
          console.error('Error al obtener cuotas:', error);
          reject(error);
        }
      );
    });
  }
}
