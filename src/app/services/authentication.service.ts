import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthDTO } from 'src/models/userauth'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  authenticateUser(userAuthDTO: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<UserAuthDTO>(`${this.apiUrl}usuario/login`, userAuthDTO, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(userAuthDTO: any): Observable<any> {
    return this.http.post<boolean>(`${this.apiUrl}`, userAuthDTO).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El servidor retornó un código de error
      console.error(`Código de error ${error.status}, ` + `mensaje: ${error.message}`);
    }
    // Retorna un observable con un mensaje de error legible para el usuario
    return throwError('Error al realizar la operación. Por favor, intenta nuevamente más tarde.');
  }

  registrarEstablecimient(establecimientoRegistroDTO: any): Observable<any>{
    return this.http.post<boolean>(`${this.apiUrl}establecimiento/registrar-establecimiento`, establecimientoRegistroDTO).pipe(
      catchError(this.handleError)
    );
  }

  
}
