import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DetailsComponent } from './pages/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
//importar mat icon de material
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './layouts/header/header.component';

import { CartComponent } from './pages/cart/cart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PaymentStatusComponent } from './pages/paymentStatus/paymentStatus.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './pages/Admin/Admin.module';
import { HomeComponent } from './pages/Home/Home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
// Agrega los módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { CarruselProductsComponent } from './layouts/carruselProducts/carruselProducts.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, // Agrega FooterComponent a las declaraciones
    HeaderComponent, // Agrega HeaderComponent a las declaraciones
    LoginComponent,
    CartComponent,
    RegisterComponent,
    CarruselProductsComponent,

    LoginComponent,
    HeaderComponent,
    CartComponent,
    FooterComponent,
    PaymentStatusComponent,
    DetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    // Agrega los módulos de Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
