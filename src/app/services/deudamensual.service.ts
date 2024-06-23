import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeudamensualService {

  private apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private roleguard: RoleGuard
  ) { }

  obtenerDeudaMensualActual(cuentaCorrienteId:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}deuda-mensual/cuenta-corriente-actual`, { params: { cuentaCorrienteId } });
  }

  obtenerDeudasMensualesPorCuentaCorriente(cuentaCorrienteId:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}deuda-mensual/cuenta-corriente-deudas`, { params: { cuentaCorrienteId } });
  }
}
