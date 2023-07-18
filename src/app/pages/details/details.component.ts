import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  message: string = '';
  products: any[] = [];
  amountProducts: number = 1;
  imgP: string = '';
  img1: string = '';
  img2: string = '';
  img3: string = '';
  idProduct: any;
  inputPrice: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idProduct = this.extractLastParamFromUrl();
    this.consumeAPI();
  }

  ngOnInit(): void {}

  extractLastParamFromUrl(): string {
    const urlSegments = this.route.snapshot.url;
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment.path;
  }

  consumeAPI() {
    const api = environment.api;
    const productsUrl = `${api}/api/products`;
    this.http.get<any[]>(productsUrl).subscribe(
      (response) => {
        this.products = response;
        const product = this.products.find(
          (p) => p.productID == this.idProduct
        );
        if (product) {
          this.imgP = product.productImages[0].imageURL;
          this.img1 = product.productImages[0].imageURL;
          this.img2 = product.productImages[1].imageURL;
          this.img3 = product.productImages[2].imageURL;
          this.inputPrice = product.price;
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/']);
      }
    );
  }

  changeImage(index: number) {
    if (index === 1) {
      this.imgP = this.img1;
    }  if (index === 2) {
      this.imgP = this.img2;
    }  if (index === 3) {
      this.imgP = this.img3;
    }
  }

  addAmountProducts() {
    this.amountProducts++;
    this.inputPrice = this.products[this.idProduct - 1]?.price * this.amountProducts;
  }

  restAmountProducts() {
    if (this.amountProducts === 1) {
      console.log('quantity in 1');
    } else {
      this.amountProducts--;
      this.inputPrice = this.products[this.idProduct - 1]?.price * this.amountProducts;
    }
  }



  addToCart() {
    const userJson: string | null = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const userID = user.userID;
      const api = environment.api;
      const data = {
        userID: userID,
        productID: this.idProduct,
        quantity: this.amountProducts,
      };
      this.http.post(`${api}/api/cart`, data).subscribe(
        (response: any) => {
          window.location.reload();
          this.router.navigate(['/cart']);
        },
        (error) => {
          console.log(error);
          this.message = error.error.message;
        }
      );
    } else {
      // Handle the case when the user is not logged in
    }
  }
}
