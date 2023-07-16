import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventorySelectedComponent } from './inventory-edit/inventory-selected/inventory-selected.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { AdminComponent } from './Admin.component';

@NgModule({
  declarations: [
    InventorySelectedComponent,
    UserEditComponent,
    AdminComponent,
    InventoryEditComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'admin', component: AdminComponent },
      { path: 'admin/user', component: UserEditComponent },
      { path: 'admin/inventory', component: InventoryEditComponent },
      { path: 'admin/inventory/:productID', component: InventorySelectedComponent}
    ]),
    FormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
