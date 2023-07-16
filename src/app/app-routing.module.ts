import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/Home/Home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'details/:id', component: DetailsComponent},
  { path: 'cart', component: CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
