import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;

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

}

