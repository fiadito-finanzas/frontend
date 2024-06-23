import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

const storage = localStorage;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  establecimientoRegistroDTO: any = {
    usuario: {
      username: '',
      password: '',
      email: '',
      nombre: ''
    },
    establecimiento: {
      nombre: '',
      direccion: '',
      usuarioId: null,
      rubro: '',
      ciudad: '',
      provincia: '',
    }
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit(): void {
    this.authService.registrarEstablecimient(this.establecimientoRegistroDTO).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.router.navigate(['/login']); // Redirigir a la página de inicio después de autenticar
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
