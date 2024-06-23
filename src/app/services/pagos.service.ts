import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  apiUrl = 'http://localhost:8080/'
  constructor(
    private http: HttpClient
  ) { }

  registrarPago(pago: any){
    return this.http.post<any>(`${this.apiUrl+'pagos/registrar-pago'}`, pago);
  }
}
