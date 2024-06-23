import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost:8080/producto';

  constructor(
    private http: HttpClient
  ) { }

  listaProductos() : Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  crearProducto(producto: any) : Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, producto);
  }

  actualizarProducto(id: number, producto: any) : Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, producto);
  }

  eliminarProducto(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }

}
