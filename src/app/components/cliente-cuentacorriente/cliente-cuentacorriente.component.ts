import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CuentacorrienteService } from 'src/app/services/cuentacorriente.service';
import { DeudamensualService } from 'src/app/services/deudamensual.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-cliente-cuentacorriente',
  templateUrl: './cliente-cuentacorriente.component.html',
  styleUrls: ['./cliente-cuentacorriente.component.css']
})
export class ClienteCuentacorrienteComponent implements OnInit {
  @Input() clienteId!: number; // Recibimos el clienteId como entrada desde el componente padre
  @Input() cuentaCorriente!: any; // Recibimos el cuentaCorrienteId como entrada desde el componente padre

  deudaMensual: any;
  loading: boolean = false;
  mostrarEditarCuentaCorriente: boolean = false;
  @ViewChild('confirmacionEliminarCliente') confirmacionEliminarClienteTemplate!: TemplateRef<any>;

  constructor(private cuentaCorrienteService: CuentacorrienteService,
    private deudaMensualService: DeudamensualService,
    private transaccionesService: TransaccionesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  confirmarEliminacion(): void {
    const dialogRef = this.dialog.open(this.confirmacionEliminarClienteTemplate);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.eliminarCuentaCorriente();
      }
    });
  }

  async cargarDatos(): Promise<void> {
    this.loading = true;
    try {
      await this.obtenerCuentaCorriente();
      if (this.cuentaCorriente && this.cuentaCorriente.id) {
        console.log('Cuenta corriente:', this.cuentaCorriente);
        await this.obtenerDeudaMensual(this.cuentaCorriente.id);
        await this.obtenerTransacciones(this.cuentaCorriente.id);
      }
    } catch (error) {
      console.error('Error al cargar datos', error);
    }
    this.loading = false;
  }

  obtenerCuentaCorriente(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuentaCorrienteService.obtenerCuentaCorrientePorCliente(this.clienteId).subscribe(
        (response: any) => {
          console.info('Cuenta corriente del cliente:', response);
          this.cuentaCorriente = response;
          resolve(response);
        },
        (error: any) => {
          console.error('Error al obtener cuenta corriente:', error);
          reject(error);
        }
      );
    });
  }
  // Método para abrir el modal de edición de cuenta corriente
  abrirEditarCuentaCorriente(): void {
    this.mostrarEditarCuentaCorriente = true;
  }

  // Método para cerrar el modal de edición de cuenta corriente
  cerrarEditarCuentaCorriente(): void {
    this.mostrarEditarCuentaCorriente = false;
  }
  obtenerDeudaMensual(cuentaCorrienteId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Cuenta corriente ID:', cuentaCorrienteId);
      this.deudaMensualService.obtenerDeudaMensualActual(cuentaCorrienteId).subscribe(
        (response: any) => {
          console.info('Deuda mensual actual:', response);
          this.deudaMensual = response;
          resolve(response);
        },
        (error: any) => {
          console.error('Error al obtener deuda mensual:', error);
          reject(error);
        }
      );
    });
  }

  obtenerTransacciones(cuentaCorrienteId:any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.transaccionesService.obtenerTransaccionesPorCuentaCorriente(cuentaCorrienteId).subscribe(
        (response: any) => {
          console.info('Transacciones de la cuenta corriente:', response);
          this.cuentaCorriente.transacciones = response;
          resolve(response);
        },
        (error: any) => {
          console.error('Error al obtener transacciones:', error);
          reject(error);
        }
      );
    });
  }
// Método para guardar los cambios en la cuenta corriente
guardarCambiosCuentaCorriente(datosCuentaCorriente: any): void {
  // Lógica para guardar los cambios de la cuenta corriente
  console.log('Datos de la cuenta corriente a guardar:', datosCuentaCorriente);
  this.cuentaCorrienteService.actualizarCuentaCorriente(datosCuentaCorriente).subscribe(
    (response: any) => {
      console.info('Cuenta corriente actualizada:', response);
      this.cuentaCorriente = response;
      this.cerrarEditarCuentaCorriente();
    },
    (error: any) => {
      console.error('Error al actualizar cuenta corriente:', error);
    }
  );

}

eliminarCuentaCorriente(): void {
  this.cuentaCorrienteService.eliminarCuentaCorriente(this.cuentaCorriente.id).subscribe(
    () => {
      console.info('Cuenta corriente eliminada');
      // Redirigir a la misma ruta para hacer un refresh
      this.cancelarEliminar();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/detalle-cliente', this.clienteId]);
      });
    },
    error => {
      console.error('Error al eliminar la cuenta corriente', error);
      // Manejar el error según la aplicación, como mostrar un mensaje al usuario
    }
  );
}


cancelarEliminar(): void {
  this.dialog.closeAll();
}
  // Método para navegar a la ventana de deudas mensuales
  verTodasLasDeudasMensuales(): void {
    this.router.navigate(['/deudas-mensuales', this.cuentaCorriente.id]);
  }
}
