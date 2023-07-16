import { Component, OnInit } from '@angular/core';
import { carProductsService } from 'src/app/services/Productos.service';
import { ActivatedRoute } from '@angular/router';

interface Producto {
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  datos: any;
  // productos: Producto[] = [
  //   { nombre: 'Producto 1', precio: 10.99 },
  //   { nombre: 'Producto 2', precio: 19.99 },
  //   { nombre: 'Producto 3', precio: 5.49 }
  // ];

  // totalSuma: number = 0;

  constructor(private carProducts: carProductsService, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.agregarNuevoProducto();
  //   this.calcularTotal();
  //   console.log(this.productos)
  // }
  ngOnInit(): void{
    const userID = this.route.snapshot.params['userID'];
    console.log('ID de usuario:', userID);
    
    this.getProducts(userID);
    
  }

  getProducts(userID: string){
    this.carProducts.showProducts(userID).subscribe
    ((response: any) => {
        console.log('Datos enviados', response);
        return `/user/${userID}/active`;
    },
    (error: any) => {
      console.error('Error al enviar los datos', error);
    });
  }
  // agregarNuevoProducto() {
  //   const nuevoProducto: Producto = {
  //     nombre: 'Nuevo Producto',
  //     precio: 25.99
  //   };

  //   this.productos.push(nuevoProducto);
  // }

  // seleccionarProducto(producto: Producto) {
  //   // Aquí puedes implementar la lógica para seleccionar el producto
  //   // Puedes guardar el producto seleccionado en otra variable o hacer algo con él.
  // }

  // borrarProducto(producto: Producto) {
  //   // Aquí puedes implementar la lógica para borrar el producto
  //   const index = this.productos.indexOf(producto);
  //   if (index !== -1) {
  //     this.productos.splice(index, 1);
  //     this.calcularTotal();
  //   }
  // }

  // calcularTotal() {
  //   this.totalSuma = this.productos.reduce((total, producto) => total + producto.precio * this.cantidadProductos, 0);
  // }

  // cantidadProductos: number = 0;

  // restarProducto() {
  //   if (this.cantidadProductos > 0) {
  //     this.cantidadProductos--;
  //   }
  // }

  // sumarProducto() {
  //   this.cantidadProductos++;
  // }


}
