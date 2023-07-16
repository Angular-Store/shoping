import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventorySelectedComponent } from './inventory-edit/inventory-selected/inventory-selected.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdminComponent } from './Admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InventorySelectedComponent,
    UserEditComponent,
    AdminComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([
    //   { path: '', component: InventoryEditComponent },
      { path: 'inventory/:id', component: InventorySelectedComponent },
    ]),
    FormsModule,
  ],
})
export class AdminModule {}
