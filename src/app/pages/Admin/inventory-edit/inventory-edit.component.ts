import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css'],
})
export class InventoryEditComponent {
  loading: boolean = true;
  disabled: boolean = true;
  inventory: any;
  editedInventory: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url: string = 'https://angular-store.onrender.com';

    // Obtener inventario desde la API
    this.http.get(`${url}/api/inventory`).subscribe(
      (response: any) => {
        this.inventory = response;
        this.loading = false;
        console.log(this.inventory);
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  editInventory() {
    this.disabled = false;
  }

  saveInventory() {
    // PUT /api/inventory/:productID
    // this.loading = true;
    const url: string = 'https://angular-store.onrender.com';

    // Enviar información a la API
    const productID: number = 1; // Replace with the actual product ID

    // send only the quantity stockMin stockMax to an especific product

    // test console.log
    console.log(this.inventory);
    // this.http
    //   .put(`${url}/api/inventory/${productID}`, {
    //     quantity: this.inventory.quantity,
    //     stockMin: this.inventory.stockMin,
    //     stockMax: this.inventory.stockMax,
    //   })
    //   .subscribe((response: any) => {
    //     this.disabled = true;
    //     this.loading = false;
    //   });
  }
}
