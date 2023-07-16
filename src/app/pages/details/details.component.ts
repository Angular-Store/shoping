import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  api = 'https://rickandmortyapi.com/api/character/2';
  producto: number;

  constructor(private http: HttpClient ) {
    this.producto = 1;
  }

  ngOnInit(): void {
  }

  aumentarCompra() {
    this.producto++;
    console.log("cantidad en " + this.producto);
  }

  disminuirCompra() {
    if (this.producto === 0) {
      console.log("cantidad en 0");
    } else {
      this.producto--;
      console.log("cantidad en " + this.producto);
    }
  }

  addToCart() {
    this.consumirAPI();
    alert('producto añadido al carro');
  }

  async consumirAPI() {
    try {
      const data = await this.http.get<any>(this.api).toPromise();
      // Procesa la respuesta de la API
      console.log(data);
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error(error);
    }
  }
}
