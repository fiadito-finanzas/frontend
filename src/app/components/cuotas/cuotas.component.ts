import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent {
  cuotas: any[] = []; // Ajusta el tipo de datos según tu modelo de cuotas
  displayedColumns: string[] = ['numeroCuota', 'fechaVencimiento', 'saldoInicial', 'montoCapital', 'montoInteres', 'montoAmortizacion', 'saldoFlujo', 'pagada', 'periodoGracia', 'monto'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cuotaService: CuotasService) {
    // Recibe la transacción seleccionada desde el componente de transacciones
    if (data && data.cuotas) {
      // buscar las cuotas de la transacción seleccionada
      this.cuotaService.obtenerCuotasPorTransaccion(data.id).subscribe(
        (data: any) => {
          console.log('Cuotas:', data);
          this.cuotas = data;
        },
        error => {
          console.error('Error al obtener cuotas:', error);
        }
      );
    }
  }
}
