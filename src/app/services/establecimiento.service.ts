import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  private apiUrl = 'http://localhost:8080/';
  constructor(
    private http: HttpClient,
    private roleguard: RoleGuard
  ) { }

  getEstablecimientoId(): any {
    console.log('ID del JWT: ', this.roleguard.getId());
    return this.roleguard.getId();
  }

  obtenerClientesPorEstablecimiento(): Observable<any> {
    const establecimientoId = this.getEstablecimientoId();
    return this.http.get<any>(`${this.apiUrl}cliente/obtener-clientes-por-establecimiento/`+establecimientoId);
  }


}
