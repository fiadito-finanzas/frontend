import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { CuotasComponent } from '../cuotas/cuotas.component';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';

@Component({
  selector: 'app-transacciones-establecimiento',
  templateUrl: './transacciones-establecimiento.component.html',
  styleUrls: ['./transacciones-establecimiento.component.css']
})
export class TransaccionesEstablecimientoComponent {
  cuentaCorrienteId!: number;
  transacciones: any[] = [];
  transaccionesFiltradas: any[] = [];
  displayedColumns: string[] = ['fecha', 'monto', 'tipo', 'interes', 'cuotas']; // Definir las columnas que se mostrarán
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  tipoTransaccion: string | null = null; // Puede ser 'COMPRA' o 'COMPRA_A_CUOTAS'

  constructor(
    private route: ActivatedRoute,
    private transaccionesService: TransaccionesService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private establecimientoService: EstablecimientoService
  ) {}

  ngOnInit(): void {
    this.cuentaCorrienteId = +this.route.snapshot.paramMap.get('cuentaCorrienteId')!;
    this.obtenerTransacciones();

  }

  obtenerTransacciones(): void {
    this.transaccionesService.obtenerTransaccionesPorEstablecimiento(this.cuentaCorrienteId).subscribe(
      (data: any[]) => {
        console.log('Transacciones:', data);
        this.transacciones = data;
        this.transaccionesFiltradas = data;
      },
      error => {
        console.error('Error al obtener transacciones:', error);
      }
    );
  }

  filtrarTransacciones(): void {
    this.transaccionesFiltradas = this.transacciones.filter(transaccion => {
      const fechaTransaccion = new Date(transaccion.fecha);
      const cumpleFechaInicio = !this.fechaInicio || fechaTransaccion >= this.fechaInicio;
      const cumpleFechaFin = !this.fechaFin || fechaTransaccion <= this.fechaFin;
      const cumpleTipo = !this.tipoTransaccion || transaccion.tipo === this.tipoTransaccion;
      return cumpleFechaInicio && cumpleFechaFin && cumpleTipo;
    });
  }

  borrarFiltro(): void {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.tipoTransaccion = null;
    this.transaccionesFiltradas = [...this.transacciones];
  }

  formatearFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
  }

  verCuotas(transaccion: any): void {
    // Abre el cuadro de diálogo para mostrar las cuotas de la transacción seleccionada
    const dialogRef = this.dialog.open(CuotasComponent, {
      width: '800px', // Ajusta el ancho según tu diseño
      data: transaccion // Pasa la transacción seleccionada al componente de cuotas
    });
  }
}
