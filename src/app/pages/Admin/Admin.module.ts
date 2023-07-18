import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InventorySelectedComponent } from './inventory-edit/inventory-selected/inventory-selected.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { AdminComponent } from './Admin.component';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      {
        path: 'admin/user',
        component: UserEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/inventory',
        component: InventoryEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/inventory/:productID',
        component: InventorySelectedComponent,
        canActivate: [AdminGuard],
      },
    ]),
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
  ],
})
export class AdminModule {}
