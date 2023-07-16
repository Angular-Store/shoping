import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Obtener el token del local storage

    if (token) {
      return true; // El usuario está autenticado, permitir acceso
    } else {
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      return false;
    }
  }
}
