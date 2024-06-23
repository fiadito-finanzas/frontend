import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'http://localhost:8080/';

  obtenerCuotasPorDeudaMensual(deudaMensualId: any) {
    return this.http.get<any>(`${this.apiUrl+'cuota/obtener-cuotas-por-deuda-mensual/'+deudaMensualId}`);
  }

  obtenerCuotasPorTransaccion(transaccionId: any) {
    return this.http.get<any>(`${this.apiUrl+'cuota/obtener-cuotas-por-transaccion/'+transaccionId}`);
  }
}
