import { Component, OnInit } from '@angular/core'; // Importa la clase Component y OnInit desde '@angular/core'
import { ActivatedRoute } from '@angular/router'; // Importa la clase ActivatedRoute desde '@angular/router'
import { HttpClient } from '@angular/common/http'; // Importa la clase HttpClient desde '@angular/common/http'
import { environment } from 'src/enviroment/enviroment'; // Importa el archivo de configuración de entorno
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa el módulo MatProgressSpinnerModule de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Importa el módulo MatIconModule de Angular Material

@Component({
  selector: 'app-payment-status', // Selector CSS para el componente
  templateUrl: './paymentStatus.component.html', // Ruta del archivo de plantilla HTML para el componente
  styleUrls: ['./paymentStatus.component.css'] // Rutas de los archivos de estilos CSS para el componente
})
export class PaymentStatusComponent implements OnInit { // Definición de la clase PaymentStatusComponent implementando OnInit
  loading: boolean = true; // Variable para controlar el estado de carga
  order: any; // Variable para almacenar los datos del pedido
  message: string = ''; // Variable para almacenar un mensaje
  cartID: string = ''; // Variable para almacenar el ID del carrito
  userID: string = ''; // Variable para almacenar el ID del usuario
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // Constructor del componente que recibe instancias de ActivatedRoute y HttpClient
  }

  ngOnInit() {
    const userJson: string = localStorage.getItem('user')!;
    const user = JSON.parse(userJson);
    this.userID = user.userID;
    const url: string = environment.api;
    this.http.get(`${url}/api/orders/user/${this.userID}`).subscribe(
      (response: any) => {
        console.log(response); // Imprime la respuesta recibida en la consola
        this.order = response; // Asigna la respuesta a la variable 'order'
        this.loading = false; // Cambia el estado de carga a falso
      },
      (error: any) => {
        console.error(error); // Imprime el error en la consola
      }
    );
  }
}
