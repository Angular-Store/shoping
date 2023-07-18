import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = environment.api; // Obtén la URL de la API del objeto environment
  constructor(private http: HttpClient) { }
  getProductos() {
    const url = `${this.apiUrl}/products`; // Construye la URL completa de la API
    return this.http.get<any>(url); // Realiza la solicitud GET a la URL de la API y obtén los datos en formato JSON
  }
}



// '/user/:userID/active'   
// `${this.apiUrl}/:usersID`

export class carProductsService {
  private apiUrl = environment.api;
  constructor(private http: HttpClient){}

  showProducts(userID: string){
    const url = `${this.apiUrl}/users/${userID}/active`
    return this.http.get<any>(url);
  }
}