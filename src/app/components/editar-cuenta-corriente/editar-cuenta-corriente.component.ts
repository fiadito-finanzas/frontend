import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentacorrienteService } from 'src/app/services/cuentacorriente.service';

@Component({
  selector: 'app-editar-cuenta-corriente',
  templateUrl: './editar-cuenta-corriente.component.html',
  styleUrls: ['./editar-cuenta-corriente.component.css']
})
export class EditarCuentaCorrienteComponent implements OnInit {
  @Input() cuentaCorriente: any; // Recibe la cuenta corriente a editar desde el componente padre
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() guardarCambios: EventEmitter<any> = new EventEmitter<any>();

  cuentaCorrienteForm!: FormGroup;
  tiposInteres: string[] = ['Efectiva', 'Nominal'];
  periodosCapitalizacion: { value: string, label: string }[] = [
    { value: 'diario', label: 'Diario' },
    { value: 'quincenal', label: 'Quincenal' },
    { value: 'mensual', label: 'Mensual' },
    { value: 'bimestral', label: 'Bimestral' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'cuatrimestral', label: 'Cuatrimestral' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'anual', label: 'Anual' }
  ];

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef){}
  crearFormulario(): void {
    this.cuentaCorrienteForm = this.formBuilder.group({
      id: [this.cuentaCorriente?.id],
      tasaInteres: [this.cuentaCorriente?.tasaInteres, Validators.required],
      tasaMoratoria: [this.cuentaCorriente?.tasaMoratoria, Validators.required],
      saldoCredito: [this.cuentaCorriente?.saldoCredito, Validators.required],
      fechaPagoMensual: [this.obtenerFechaFormateada(this.cuentaCorriente?.fechaPagoMensual), Validators.required],
      tipoInteres: [this.cuentaCorriente?.tipoInteres, Validators.required],
      periodoCapitalizacion: [this.cuentaCorriente?.periodoCapitalizacion, Validators.required]
    });
    this.detectarCambios(); // Llamamos al método para detectar cambios después de inicializar el formulario
  }
  ngOnInit(): void {
    this.crearFormulario();
  }
  obtenerFechaFormateada(fecha: string): string {
    if (fecha) {
      // Extraer solo la parte de la fecha (YYYY-MM-DD) de la cadena completa de fecha y hora
      console.log('Fecha:', fecha);
      return fecha.substring(0, 10); // Esto asume que la fecha viene en formato ISO 8601
    }
    return '';
  }
  cargarDatos(): void {
    console.log('Datos de la cuenta corriente:', this.cuentaCorriente);
    if (this.cuentaCorriente) {
      this.cuentaCorrienteForm.patchValue(this.cuentaCorriente);
    }
  }
  detectarCambios(): void {
    this.cdr.detectChanges(); // Forzamos la detección de cambios
  }
  cerrar(): void {
    // Emitir evento para indicar que se debe cerrar el modal
    this.cerrarModal.emit(true);
  }

  guardar(): void {
    // Emitir evento para enviar los cambios de la cuenta corriente al componente padre
    if (this.cuentaCorrienteForm.valid) {
      this.guardarCambios.emit(this.cuentaCorrienteForm.value);
    }
  }
}
