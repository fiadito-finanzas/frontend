import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { CuotasComponent } from '../cuotas/cuotas.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transacciones-cuentacorriente',
  templateUrl: './transacciones-cuentacorriente.component.html',
  styleUrls: ['./transacciones-cuentacorriente.component.css']
})
export class TransaccionesCuentacorrienteComponent {
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cuentaCorrienteId = +this.route.snapshot.paramMap.get('cuentaCorrienteId')!;
    this.obtenerTransacciones();
  }

  obtenerTransacciones(): void {
    this.transaccionesService.obtenerTransaccionesPorCuentaCorriente(this.cuentaCorrienteId).subscribe(
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
      const cumpleFechaInicio = this.fechaInicio ? fechaTransaccion >= this.fechaInicio : true;
      const cumpleFechaFin = this.fechaFin ? fechaTransaccion <= this.fechaFin : true;
      const cumpleTipo = this.tipoTransaccion ? transaccion.tipo === this.tipoTransaccion : true;
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

  verCuotas(transaccion: any) {
    // Abre el cuadro de diálogo para mostrar las cuotas de la transacción seleccionada
    const dialogRef = this.dialog.open(CuotasComponent, {
      width: '800px', // Ajusta el ancho según tu diseño
      data: transaccion // Pasa la transacción seleccionada al componente de cuotas
    });
  }
}
