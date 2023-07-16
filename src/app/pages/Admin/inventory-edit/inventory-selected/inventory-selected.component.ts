import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventory-selected',
  templateUrl: './inventory-selected.component.html',
  styleUrls: ['./inventory-selected.component.css'],
})
export class InventorySelectedComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  loading: boolean = true;
  inventory: any = {};
  product: any = {};
  inventoryDisabled: boolean = true;
  productDisabled: boolean = true;
  inventoryMessage: string = '';
  productMessage: string = '';

  ngOnInit() {
    // Obtener el ID del producto desde la URL
    const productId: number = this.route.snapshot.params['productID'];
    const url: string = 'https://angular-store.onrender.com';

    // Realizar ambas peticiones simultáneamente utilizando forkJoin
    forkJoin([
      this.http.get(`${url}/api/inventory/product/${productId}`),
      this.http.get(`${url}/api/products/${productId}`),
    ]).subscribe(
      (response: [any, any]) => {
        this.inventory = response[0];
        this.product = response[1];
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  editInventory() {
    this.inventoryDisabled = false;
  }

  editProduct() {
    this.productDisabled = false;
  }

  saveInventory() {
    this.loading = true;
    const url: string = 'https://angular-store.onrender.com';

    // Enviar información a la API
    const productID: number = this.inventory.productID;

    this.http
      .put(`${url}/api/inventory/product/${productID}`, this.inventory)
      .subscribe(
        (response: any) => {
          this.inventoryMessage = response.message;
          this.inventoryDisabled = true;
          this.loading = false;
        },
        (error: any) => {
          console.error(error);
          this.loading = false;
        }
      );
  }

  saveProduct() {
    this.loading = true;
    const url: string = 'https://angular-store.onrender.com';

    // Enviar información a la API
    const productID: number = this.product.productID;

    this.http.put(`${url}/api/products/${productID}`, this.product).subscribe(
      (response: any) => {
        this.productMessage = response.message;
        this.productDisabled = true;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
