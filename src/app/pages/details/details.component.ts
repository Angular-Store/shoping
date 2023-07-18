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
  message: string = ''; // Variable para almacenar un mensaje
  products: any[] = []; // Arreglo para almacenar los productos
  amountProducts: number = 1; // Cantidad de productos inical que le aparece al usuario
  imgP: string = ''; // URL de la imagen principal del producto
  img1: string = ''; // URL de la primera imagen del producto
  img2: string = ''; // URL de la segunda imagen del producto
  img3: string = ''; // URL de la tercera imagen del producto
  idProduct: any; // ID del producto
  inputPrice: number = 0; // Precio del producto

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idProduct = this.extractLastParamFromUrl(); // Extrae el último parámetro de la URL
    this.consumeAPI(); // Llama a la función para consumir una API
  }

  ngOnInit(): void {}

  /**
   * Extrae el último parámetro de la URL.
   * @returns El último parámetro de la URL como una cadena de texto.
   */
  extractLastParamFromUrl(): string {
    const urlSegments = this.route.snapshot.url;
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment.path;
  }

  // Consumir una API para obtener los productos
  consumeAPI() {
    const api = environment.api;
    const productsUrl = `${api}/api/products`;
    this.http.get<any[]>(productsUrl).subscribe(
      (response) => {
        this.products = response; // Almacena la respuesta de la API en la variable 'products'
        const product = this.products.find(
          (p) => p.productID == this.idProduct
        ); // Busca el producto con el ID correspondiente
        if (product) {
          this.imgP = product.productImages[0].imageURL; // Asigna la URL de la imagen que será la principal
          this.img1 = product.productImages[0].imageURL; // Asigna la URL de la primera imagen
          this.img2 = product.productImages[1].imageURL; // Asigna la URL de la segunda imagen
          this.img3 = product.productImages[2].imageURL; // Asigna la URL de la tercera imagen
          this.inputPrice = product.price; // Asigna el precio del producto
        } else {
          this.router.navigate(['/']); // Si el producto no se encuentra, redirige al inicio
        }
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/']); // Si hay un error en la solicitud, redirige al inicio
      }
    );
  }

  /**
   * Cambia la imagen principal del producto según el índice recibido.
   * @param index El índice de la imagen a mostrar.
   */
  changeImage(index: number): void {
    if (index === 1) {
      this.imgP = this.img1;
    } else if (index === 2) {
      this.imgP = this.img2;
    } else if (index === 3) {
      this.imgP = this.img3;
    }
  }

  /**
   * Aumenta la cantidad de productos y actualiza el precio total.
   */
  addAmountProducts(): void {
    this.amountProducts++;
    this.inputPrice = this.products[this.idProduct - 1]?.price * this.amountProducts;
  }

  /**
   * Reduce la cantidad de productos y actualiza el precio total.
   */
  restAmountProducts(): void {
    if (this.amountProducts === 1) {
      console.log('quantity in 1');
    } else {
      this.amountProducts--;
      this.inputPrice = this.products[this.idProduct - 1]?.price * this.amountProducts;
    }
  }

  /**
   * Agrega el producto al carrito.
   */
  addToCart(): void {
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
      // Maneja el caso cuando el usuario no ha iniciado sesión y lo envia a el login
      alert('You must be logged in to add products to the cart');
      this.router.navigate(['/login']);
    }
  }
}
