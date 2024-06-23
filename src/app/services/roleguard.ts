import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    const expectedRole = route.data['expectedRole'];
    interface DecodedToken {
        user_id: string;
        roles: {
          authority: string;
        };
        sub: string;
        iat: number;
        exp: number;
      }
      const token = localStorage.getItem('jwt');
      if (token) {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const userRoles = decodedToken.roles.authority;
    if (userRoles === expectedRole) {
      return true;
      }
    }
    // Usuario no autorizado; redirigir al inicio de sesión
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  getId() : any {
    interface DecodedToken {
      user_id: string;
      roles: {
        authority: string;
      };
      sub: string;
      iat: number;
      exp: number;
    }
    const token = localStorage.getItem('jwt');
    if (token) {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const userId = decodedToken.user_id;
    return userId;
    }
  }

  getRole():any{
    interface DecodedToken {
      user_id: string;
      roles: {
        authority: string;
      };
      sub: string;
      iat: number;
      exp: number;
    }
    const token = localStorage.getItem('jwt');
    if (token) {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const roleUser = decodedToken.roles.authority;
    return roleUser;
    }
  }
}