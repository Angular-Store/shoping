import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/enviroment/enviroment';

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
  dataSource: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const url: string = environment.api;

    // Obtener inventario desde la API
    this.http.get(`${url}/api/inventory`).subscribe(
      (response: any) => {
        this.inventory = response;
        this.dataSource = new MatTableDataSource(this.inventory);
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  inventorySelected(item: any) {
    // navigate to inventory selected
    this.router.navigate(['/admin/inventory', item.productID]); // Add '/' before 'admin/inventory'
  }

  goBack() {
    window.history.back();
  }

  isTableScrollable(): boolean {
    const tableContainer = document.querySelector('.table-container') as HTMLElement;
    return tableContainer.scrollWidth > tableContainer.clientWidth;
  }

  scrollTableRight(): void {
    const tableWrapper = document.querySelector('.table-wrapper') as HTMLElement;
    tableWrapper.scrollLeft += 100; // Adjust the scroll amount as needed
  }
}
