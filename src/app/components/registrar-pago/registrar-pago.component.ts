import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css']
})
export class RegistrarPagoComponent implements OnChanges {
  pagoDTO: any = { isCuota: false };
  cuotasDisponibles: any[] = [];
  tipoPago: string = 'completo';
  displayedColumns: string[] = ['numero', 'monto', 'accion']; // Columnas para la tabla

  @Output() pagoRegistrado: EventEmitter<any> = new EventEmitter<any>();
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() deudaMensual: any;
  @Input() cuentaCorriente: any;
  @Input() cuotas: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['deudaMensual'] && this.deudaMensual) {
      console.log('deudaMensual ha cambiado:', this.deudaMensual);
      if (this.tipoPago === 'completo') {
        this.pagoDTO.monto = this.calcularMontoCompletoDeuda();
      }
    }
  }

  seleccionarTipoPago(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const tipoPago = selectElement.value;

    this.tipoPago = tipoPago;
    if (tipoPago === 'completo') {
      this.pagoDTO.isCuota = false;
      this.pagoDTO.monto = this.calcularMontoCompletoDeuda();
    } else if (tipoPago === 'cuotas') {
      this.pagoDTO.isCuota = true;
      this.cuotasDisponibles = this.cuotas;
    }
  }

  calcularMontoCompletoDeuda(): number {
    this.pagoDTO.deudaMensualId = this.deudaMensual.id || {};
    this.pagoDTO.clienteId = this.cuentaCorriente.clienteId || {};
    if (!this.deudaMensual) {
      console.error('deudaMensual no está definido');
      return 0;
    }
    return this.deudaMensual.monto || 0;
  }

  seleccionarCuota(cuota: any): void {
    this.pagoDTO.cuotaId = cuota.id;
    this.pagoDTO.monto = cuota.monto;
  }

  registrarPago(): void {
    if (this.validarFormulario()) {
      this.pagoRegistrado.emit(this.pagoDTO);
      this.cerrarModal.emit();
    }
  }

  validarFormulario(): boolean {
    if (this.tipoPago === 'cuotas' && !this.pagoDTO.cuotaId) {
      console.error('Debe seleccionar una cuota para realizar el pago.');
      return false;
    }

    if (this.pagoDTO.monto <= 0) {
      console.error('El monto del pago debe ser mayor que cero.');
      return false;
    }

    if (!this.pagoDTO.metodoPago) {
      console.error('Debe seleccionar un método de pago.');
      return false;
    }

    return true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
