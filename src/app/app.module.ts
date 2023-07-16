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
import { FormsModule } from '@angular/forms';
import { AdminModule } from './pages/Admin/Admin.module';
import { HomeComponent } from './pages/Home/Home.component';

@NgModule({
  declarations: [
    AppComponent,
 LoginComponent,
    HeaderComponent,
    CartComponent,
    FooterComponent,
    DetailsComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
