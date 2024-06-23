import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentacorrienteService {

  private apiUrl = 'http://localhost:8080/';
  

  constructor(private http: HttpClient) { }


  crearCuentaCorriente(cuentaCorriente:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}cuenta-corriente/crear-cuenta-corriente`, cuentaCorriente);
  }

  obtenerCuentaCorrientePorCliente(clienteId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}cuenta-corriente/obtener-cuenta-corriente/`+ clienteId);
  }

  actualizarCuentaCorriente(cuentaCorriente:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}cuenta-corriente/actualizar-cuenta-corriente`, cuentaCorriente);
  }

  eliminarCuentaCorriente(cuentaCorrienteId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}cuenta-corriente/eliminar-cuenta-corriente/`+ cuentaCorrienteId);
  }

}
