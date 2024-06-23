import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { EstablecimientoService } from './establecimiento.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {


  apiUrl = 'http://localhost:8080/'

  constructor(
    private http: HttpClient,
    private roleGuard: RoleGuard,
    private establecimientoService: EstablecimientoService
  ) { }

  obtenerTransaccionesPorCuentaCorriente(cuentaCorrienteId: any) {
    return this.http.get<any>(`${this.apiUrl+'transaccion/obtener-transacciones-por-cuenta-corriente/'+cuentaCorrienteId }`);
  }

  registrarTransaccion(transaccion: any) {
    return this.http.post<any>(`${this.apiUrl+'transaccion/registrar-transaccion'}`, transaccion);
  }

  obtenerTransaccionesPorEstablecimiento(establecimientoId: any) {
    // Obtener ID del JWT
    const id = this.establecimientoService.getEstablecimientoId();
    return this.http.get<any>(`${this.apiUrl+'transaccion/obtener-transacciones'}`);
  }
}
