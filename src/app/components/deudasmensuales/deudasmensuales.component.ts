import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeudamensualService } from 'src/app/services/deudamensual.service';

@Component({
  selector: 'app-deudasmensuales',
  templateUrl: './deudasmensuales.component.html',
  styleUrls: ['./deudasmensuales.component.css'],
  providers: [DatePipe]
})
export class DeudasmensualesComponent {
  cuentaCorrienteId!: number;
  deudasOriginales: any[] = [];
  deudasFiltradas: any[] = [];
  displayedColumns: string[] = ['mes', 'fechaInicioCiclo', 'fechaFinCiclo', 'fechaPago', 'monto', 'interes', 'pagada'];
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  pagada: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private deudasMensualesService: DeudamensualService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cuentaCorrienteId = +this.route.snapshot.paramMap.get('cuentaCorrienteId')!;
    this.obtenerDeudasMensuales();
  }

  obtenerDeudasMensuales(): void {
    this.deudasMensualesService.obtenerDeudasMensualesPorCuentaCorriente(this.cuentaCorrienteId).subscribe(
      (data: any) => {
        console.log('Deudas mensuales:', data);
        this.deudasOriginales = data;
        this.deudasFiltradas = [...this.deudasOriginales]; // Inicialmente, todas las deudas son visibles
      },
      error => {
        console.error('Error al obtener deudas mensuales:', error);
      }
    );
  }

  filtrarDeudas(): void {
    this.deudasFiltradas = this.deudasOriginales.filter(deuda => {
      const fechaPago = new Date(deuda.fechaPago);
      const cumpleFechaInicio = this.fechaInicio ? fechaPago >= this.fechaInicio : true;
      const cumpleFechaFin = this.fechaFin ? fechaPago <= this.fechaFin : true;
      const cumpleEstadoPago = this.pagada !== null ? deuda.pagada === this.pagada : true;
      return cumpleFechaInicio && cumpleFechaFin && cumpleEstadoPago;
    });
  }
  borrarFiltro(): void {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.pagada = null;
    this.deudasFiltradas = [...this.deudasOriginales]; // Restaurar la lista original
  }

  formatearMes(fecha: string): string {
    return this.datePipe.transform(fecha, 'MMMM yyyy') || '';
  }
}
