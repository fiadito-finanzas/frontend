import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = 'http://localhost:8080/';

  obtenerClientes(establecimientoId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}cliente/obtener-clientes-por-establecimiento`, { params: { establecimientoId } });
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}cliente/crear-cliente`, cliente);
  }

  obtenerCliente(clienteId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}cliente/obtener-cliente/`+clienteId);
  }

  editarCliente(cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}cliente/actualizar-cliente`, cliente);
  }

  eliminarCliente(clienteId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}cliente/eliminar-cliente/`+clienteId);
  }

  generarEstadoCuentaPDF(clienteId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}cliente/estado-cuenta/`+clienteId, { responseType: 'blob' as 'json' });
  }
}
