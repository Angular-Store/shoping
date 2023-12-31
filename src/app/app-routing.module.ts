import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/Home/Home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentStatusComponent } from './pages/paymentStatus/paymentStatus.component';
import { Page404Component } from './Extrapeges/Page404/Page404.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent ,canActivate: [AuthGuard]},
  { path: 'paymentStatus/:cartID', component: PaymentStatusComponent },
  // import child routes from AdminModule
  { path: '', loadChildren: () => import('./pages/Admin/Admin.module').then(m => m.AdminModule) },
  //ruta para el 404
  { path: '**', component: Page404Component },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
