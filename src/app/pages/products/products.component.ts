import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/Productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data: any;

  constructor(private apiService: ProductosService) { }

  ngOnInit() {
    this.apiService.getProductos().subscribe(response => {
      this.data = response; // Guarda los datos de la API en una variable local para usarlos en tu componente
    });
  }
}
