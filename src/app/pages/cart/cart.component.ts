import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  loading: boolean = true;
  disabled: boolean = true;
  user: any;
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // const userID: number = 1; // Replace with the actual user ID
    const url: string = environment.api;

    // Obtener usuario desde la API
    this.http.get(`${url}/api/cart/user/:userID/active`).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  removeProduct(){
    const url: string = environment.api;
    const body = {}

    this.http.put(`${url}/api/:cartID/cancel`, body).subscribe(
      (response: any) => {
        console.log('Eliminado con exito', response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  substractProduct(){
    const url: string = environment.api;

    this.http.get(`${url}/api/cart`).subscribe(
      (response: any) => {
        response.userID = response;
        response.productID = false;
        response.quantity = -1;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  addProduct(){
    const url: string = environment.api

    this.http.get(`${url}/api/cart`).subscribe(
      (response: any) => {
        response.userID = response;
        response.productID = false;
        response.quantity = 1;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }
}
