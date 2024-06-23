import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private roleguard: RoleGuard
  ) { }


  getUserById(): Observable<any> {
    const userId = this.roleguard.getId();
    const role = this.roleguard.getRole();

    let userRequest = this.http.get<any>(`${this.apiUrl}usuario/obtener-usuario`, { params: { userId } });

    let dataRequest: Observable<any> = of(null);

    if (role === 'ROLE_ESTABLECIMIENTO') {
      dataRequest = this.http.get<any>(`${this.apiUrl}establecimiento/obtener-establecimiento-por-usuario`, { params: { userId } });
    } else if (role === 'ROLE_CLIENTE') {
      dataRequest = this.http.get<any>(`${this.apiUrl}cliente/obtener-cliente`, { params: { userId } });
    }

    return forkJoin([userRequest, dataRequest]).pipe(
      map(([user,data]) => {
        return {
          user: user,
          data: data,
          role: role
        }
      })
    );
  }
}
