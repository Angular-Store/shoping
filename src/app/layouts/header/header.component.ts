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
  isAdmin: boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkAdmin();
    this.checkAuthentication();
    //isadmin

  }
  checkAdmin() {
    const userJson: string | null = localStorage.getItem('user'); // Obtener el usuario del local storage
    if (!userJson) {
      // Si el usuario no existe, establecer isAdmin como false y salir de la función
      this.isAdmin = false;
      return;
    }

    try {
      const user = JSON.parse(userJson);
      const role = user.role;
      console.log(role);

      this.isAdmin = (role === 'admin');
    } catch (error) {
      // Si hay un error al analizar el usuario, establecer isAdmin como false
      console.error('Error al analizar el objeto de usuario:', error);
      this.isAdmin = false;
    }
  }


  //funcion logout que borra todos los datos del localstorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAdmin = false;
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
