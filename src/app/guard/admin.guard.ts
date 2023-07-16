import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = 'admin'; // Obtener el usuario del local storage
    // Obtener el usuario del local storage

    if (user && user === 'admin') {
      return true; // El usuario tiene el rol de administrador, permitir acceso
    } else {
      this.router.navigate(['/']); // Redirigir a otra página si el usuario no tiene el rol adecuado
      return false;
    }
  }
}

