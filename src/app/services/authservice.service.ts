import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private apiUrl = 'http://localhost:8080/usuario/';

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return of(false);
    }
    return this.http.post<any>(`${this.apiUrl}jwt/verify`, { token: token });
  }
}
