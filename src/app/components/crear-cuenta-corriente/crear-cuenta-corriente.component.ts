import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentacorrienteService } from 'src/app/services/cuentacorriente.service';

@Component({
  selector: 'app-crear-cuenta-corriente',
  templateUrl: './crear-cuenta-corriente.component.html',
  styleUrls: ['./crear-cuenta-corriente.component.css']
})
export class CrearCuentaCorrienteComponent {

  cuentaCorrienteForm!: FormGroup;
  cliente_Id: any;
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

  constructor(
    private formBuilder: FormBuilder,
    private cuentaCorrienteService: CuentacorrienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cliente_Id = params.get('id');
      console.log('Cliente ID:', this.cliente_Id);
    });
    this.cuentaCorrienteForm = this.formBuilder.group({
      clienteId: [this.cliente_Id, Validators.required],
      tasaInteres: ['', Validators.required],
      tasaMoratoria: ['', Validators.required],
      saldoCredito: ['', Validators.required],
      fechaPagoMensual: ['', Validators.required],
      tipoInteres: ['', Validators.required],
      periodoCapitalizacion: ['', Validators.required]
    });
    
  }

  crearCuentaCorriente(): void {
    if (this.cuentaCorrienteForm.valid) {
      const cuentaCorriente: any = this.cuentaCorrienteForm.value;
      this.cuentaCorrienteService.crearCuentaCorriente(cuentaCorriente).subscribe(
        (response) => {
          console.log('Cuenta corriente creada exitosamente:', response);
          // Aquí podrías redirigir a la página de detalle del cliente u otra página
          this.router.navigate(['/detalle-cliente', this.cliente_Id]);
        },
        (error) => {
          console.error('Error al crear cuenta corriente:', error);
          // Manejo de errores: mostrar mensaje al usuario, por ejemplo
        }
      );
    } else {
      // Formulario inválido, podrías mostrar un mensaje o hacer alguna acción
    }
  }
}
