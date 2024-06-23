import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router"
import { Observable, flatMap, of, tap } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AuthserviceService } from "./authservice.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      }, error => {
        localStorage.removeItem('jwt')
        this.router.navigate(['/login']);
      })
    );
  }
}