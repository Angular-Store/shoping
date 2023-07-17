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
  loading = false;

  constructor(private http: HttpClient,private router: Router) {}


  ngOnInit() {
    const url = `${environment.api}/api/products`;
    this.http.get<any[]>(url).subscribe(response => {
      this.products = response;
      console.log('Productos:', this.products);
      //console de cada producto con un ciclo

    });
  }


  addToCart(product: number ) {
    const token = localStorage.getItem('token');
    if (token) {
      const userJson: string = localStorage.getItem('user')!;
    const user = JSON.parse(userJson);
    const userID = user.userID;
    console.log(userID);
    const api = environment.api;
    const data = {
      userID: userID,
      productID: product,
      quantity:1 //contador de productos
    };
    console.log(data.quantity);
    this.http.post(`${api}/api/cart`, data).subscribe(
      (response: any) => {
        // Lógica adicional después de agregar un producto al carrito
        console.log(response);
        console.log("se logro agregar al carrito }"  );
        //redirigir a carrito
        this.router.navigate(['/cart']);
      },
      (error: any) => {
        console.error(error);
      console.log("no se logro agregar al carrito }"  );
      }
    );
    } else {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      setTimeout(() => {
        this.router.navigate(['/login']);
      },0);
    }
  }

  goToDetails(productId: string) {
    const url = `/details/${productId}`;
    this.router.navigateByUrl(url);
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 1500);

}

}
