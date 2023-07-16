import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    const url = `${environment.api}/api/products`;
    this.http.get<any[]>(url).subscribe(response => {
      this.products = response;
      //console de cada producto con un ciclo
       for (let i = 0; i < this.products.length; i++) {
         console.log(this.products[i]);
        }
      console.log(this.products);
    });
  }

  addToCart(product: any) {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Producto añadido al carrito:', product);
    } else {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      setTimeout(() => {
        this.router.navigate(['/login']);
      },0);
    }
  }

}
