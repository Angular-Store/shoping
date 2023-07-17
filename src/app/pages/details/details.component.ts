import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  products: any[] = []; // Array para almacenar los productos
  amountProducts: number; // Variable para el número de productos
  producto: number=0; // Variable para el número de productos
  img1: string = ''; // Variables para almacenar las URLs de las imágenes
  img2: string = '';
  img3: string = '';
  img4: string = '';
  img5: string = '';
  img6: string = '';
  idProducto: any= ''; // Variable para almacenar el idProducto
  quantity: number;

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {
    this.amountProducts = 1; // Establece el número de productos en 1
    this.idProducto = this.extractLastParamFromUrl(); // Obtiene el idProducto de la ruta
    console.log(this.idProducto); // Imprime el idProducto en la consola
    this.quantity = this.amountProducts;
    this.consumirAPI(); // Llama a la función para consumir la API
  }

  ngOnInit(): void {
    // Método ngOnInit, se ejecuta después del constructor
  }

  extractLastParamFromUrl(): string {
    const urlSegments = this.route.snapshot.url;
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment.path;
  }

  consumirAPI() {
    const api = environment.api;
    const productsUrl = `${api}/api/products/${this.idProducto}`; // Agrega el idProducto a la URL
    this.http.get<any>(productsUrl).subscribe(response => {
      this.products = response; // Asigna la respuesta de la API a la variable products
      //console de cada producto con un ciclo
      console.log(this.products);
      // Obtener las imágenes del producto
      if (this.idProducto > 0 && this.idProducto < 11) {
        const product = this.products[0]; // Obtener el primer producto
        // Asigna las URLs de las imágenes del producto a las variables correspondientes
        this.img1 = response.productImages[0].imageURL;
        this.img2 = response.productImages[1].imageURL;
        this.img3 = response.productImages[2].imageURL;
      }
      //sino rediriga a home o a una pagina de error
    }, error => {
      console.log(error);
      this.router.navigate(['/']);
    });
  }

  changeImage(index: number) {
    if (index === 2) {
      const tempImg = this.img1;
      this.img1 = this.img2;
      this.img2 = tempImg;
      console.log(this.img1, this.img2, tempImg);
    } else if (index === 3) {
      const tempImg = this.img1;
      this.img1 = this.img3;
      this.img3 = tempImg;
    }
  }

  aumentarCompra() {
    this.amountProducts++;
    console.log('cantidad en ' + this.amountProducts);
  }

  disminuirCompra() {
    if (this.amountProducts === 1) {
      console.log('cantidad en 0');
    } else {
      this.amountProducts--;
      console.log('cantidad en ' + this.amountProducts);
    }
  }


  handleAmountProducts(){
    this.quantity;
  }

  addToCart() {
    try {
      const userJson: string = localStorage.getItem('user')!;
      const user = JSON.parse(userJson);
      const userID = user.userID;
      const api = environment.api;
      const data = {
        userID: userID,
        productID: this.idProducto,
        quantity: this.amountProducts // contador de productos
      };
      console.log(data.quantity);
      this.http.post(`${api}/api/cart`, data).subscribe(
        (response: any) => {
            window.location.reload(); // Recargar la página actual
            this.router.navigate(['/cart']); // Navegar a la ruta '/cart' después de recargar
          },
      );
    } catch (error) {
      console.error(error);
      console.log("No se pudo agregar al carrito");
    }
  }

}
