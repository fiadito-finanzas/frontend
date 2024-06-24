import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

const storage = localStorage;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const userAuthDTO = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authenticationService.authenticateUser(userAuthDTO).subscribe(
      (response) => {
        const jwt = response.token;
        console.log(response);
        if (response) {
          storage.setItem('jwt', jwt); // Guardar token en el almacenamiento local
          this.router.navigate(['/']); // Redirigir a la página de inicio después de autenticar
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos'; // Mostrar mensaje de error en el template
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Error al autenticar'; // Mostrar mensaje de error en el template
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']); // Redirigir a la página de registro
  }
}
