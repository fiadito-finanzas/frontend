import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {

  clienteForm: FormGroup;
  establecimientoId!: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private establecimientoService: EstablecimientoService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userNombre: ['', Validators.required],
      clienteNombre: ['', Validators.required],
      dni: ['', Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      direccion: ['', Validators.required],
      clienteEmail: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      establecimientoId: ['']
    });
  }

  ngOnInit(): void {
    this.establecimientoId = this.establecimientoService.getEstablecimientoId();
    this.clienteForm.patchValue({
      establecimientoId: this.establecimientoId
    });
  }

  onSubmit() {
    if (this.clienteForm.invalid) {
      return;
    }

    const formData = {
      usuario: {
        username: this.clienteForm.value.username,
        password: this.clienteForm.value.password,
        email: this.clienteForm.value.clienteEmail,
        nombre: this.clienteForm.value.userNombre
      },
      cliente: {
        nombre: this.clienteForm.value.clienteNombre,
        dni: this.clienteForm.value.dni,
        direccion: this.clienteForm.value.direccion,
        email: this.clienteForm.value.clienteEmail,
        telefono: this.clienteForm.value.telefono,
        establecimientoId: this.clienteForm.value.establecimientoId
      }
    };

    this.clienteService.crearCliente(formData).subscribe(
      response => {
        console.log('Cliente creado exitosamente', response);
        this.clienteForm.reset();
        this.clienteForm.patchValue({
          establecimientoId: this.establecimientoId
        });
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error al crear el cliente', error);
      }
    );
  }
}
