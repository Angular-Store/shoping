import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;
  isMenuOpen: boolean = false;
  isMenuIconClose: boolean = false; // Agregar variable para el icono del menú


  constructor() { }

  ngOnInit() {
    this.checkAuthentication();
  }
  //funcion logout que borra todos los datos del localstorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.checkAuthentication();
  }


  checkAuthentication() {
    const accessToken = localStorage.getItem('token');
    this.isLoggedIn = !!accessToken; // Verificar si el token existe
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuIconClose = !this.isMenuIconClose; // Cambiar el estado del icono del menú
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMenuIconClose = false; // Restaurar el icono de hamburguesa
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkResponsive();
  }

  checkResponsive() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 600) {
      this.isMenuOpen = false;
      this.isMenuIconClose = false;
  }
}

}