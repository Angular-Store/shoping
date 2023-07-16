import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './pages/cart/cart.component';
import { UserEditComponent } from './pages/Admin/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './pages/Admin/Admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, // Agrega FooterComponent a las declaraciones
    HeaderComponent, // Agrega HeaderComponent a las declaraciones
    LoginComponent,
    CartComponent,
    UserEditComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // Agrega FormsModule a los imports
    HttpClientModule, // Agrega HttpClientModule a los imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
