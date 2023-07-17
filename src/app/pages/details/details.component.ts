import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  products: any[] = []; // Array para almacenar los productos
  producto: number; // Variable para el número de productos
  img1: string = ''; // Variables para almacenar las URLs de las imágenes
  img2: string = '';
  img3: string = '';
  img4: string = '';
  img5: string = '';
  img6: string = '';

  constructor(private http: HttpClient) {
    this.producto = 1; // Establece el número de productos en 1
    this.consumirAPI(); // Llama a la función para consumir la API
  }

  ngOnInit(): void {
    // Método ngOnInit, se ejecuta después del constructor
  }

  consumirAPI() {
    const productsUrl = 'https://angular-store.onrender.com/api/products';
    this.http.get<any[]>(productsUrl).subscribe(response => {
      this.products = response; // Asigna la respuesta de la API a la variable products
      //console de cada producto con un ciclo
      for (let i = 0; i < this.products.length; i++) {
        console.log(this.products[i]);
      }
      console.log(this.products);

      // Obtener las imágenes del primer producto
      if (this.products.length > 0) {
        const productId = this.products[0].productID;
        const imagesUrl = `https://angular-store.onrender.com/api/products/${productId}/imageURL`;
        this.http.get<any[]>(imagesUrl).subscribe(imagesResponse => {
          if (imagesResponse.length > 0) {
            // Asigna las URLs de las imágenes a las variables correspondientes
            this.img1 = imagesResponse[0].imageURL;
            this.img2 = imagesResponse[1].imageURL;
            this.img3 = imagesResponse[2].imageURL;
            this.img4 = imagesResponse[3].imageURL;
            this.img5 = imagesResponse[4].imageURL;
            this.img6 = imagesResponse[5].imageURL;
          }
        });
      }
    });
  }
  
  // actualizarImagenes() {
  //   if (this.products.length > 0) {
  //     const product = this.products[0]; // Obtener el primer producto
  //     // Asigna las URLs de las imágenes del primer producto a las variables correspondientes
  //     this.img1 = product.productImages[0].imageURL;
  //     this.img2 = product.productImages[1].imageURL;
  //     this.img3 = product.productImages[2].imageURL;
  //     this.img4 = product.productImages[3].imageURL;
  //     this.img5 = product.productImages[4].imageURL;
  //     this.img6 = product.productImages[5].imageURL;
  //   }
  // }

  //funcion para que al dar click en una imagen pequeña se mustre como la principal
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

  //funcion para aumentar la cantidad de productos
  aumentarCompra() {
    this.producto++;
    console.log('cantidad en ' + this.producto);
  }

  //funcion para ¿disminuir la cantidad de productos
  disminuirCompra() {
    if (this.producto === 0) {
      console.log('cantidad en 0');
    } else {
      this.producto--;
      console.log('cantidad en ' + this.producto);
    }
  }

  //esto hay que quitarlo o nose xd
  addToCart() {
    console.log('item added to cart');
  }
}
