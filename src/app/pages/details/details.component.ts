import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  api = 'https://rickandmortyapi.com/api/character/';
  producto: number;
  img1: string = '';
  img2: string = '';
  img3: string = '';
  img4: string = '';

  constructor(private http: HttpClient) {
    this.producto = 1;
        this.consumirAPI()
  }

  ngOnInit(): void {
  }
  
  generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 100); // Genera un número aleatorio entre 0 y 100
  }

  async consumirAPI() {
    const    numeroAleatorio = this.generarNumeroAleatorio();
    console.log(numeroAleatorio);
    try {
      const data = await this.http.get<any>(this.api  + numeroAleatorio).toPromise();
      // Procesa la respuesta de la API
      this.img1 = data.image;
      this.img2 = data.image;
      this.img3 = data.image;
      this.img4 = data.image;

    } catch (error) {
      // Maneja los errores de la solicitud
      console.error(error);
    }
  }

  changeImage(index: number) {
    if (index === 2) {
      this.consumirAPI()
      const tempImg = this.img1;
      this.img1 = this.img2;
      this.img2 = tempImg;
      console.log(this.img1, this.img2, tempImg);
    } else if (index === 3) {
      const tempImg = this.img1;
      this.img1 = this.img3;
      this.img3 = tempImg;
    } else if (index === 4) {
      const tempImg = this.img1;
      this.img1 = this.img4;
      this.img4 = tempImg;
    }
  }

  aumentarCompra() {
    this.producto++;
    console.log('cantidad en ' + this.producto);
  }

  disminuirCompra() {
    if (this.producto === 0) {
      console.log('cantidad en 0');
    } else {
      this.producto--;
      console.log('cantidad en ' + this.producto);
    }
  }

  addToCart() {
    alert('item added to cart');
  }
}
