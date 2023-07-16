import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import {DetailsComponent} from './pages/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule  } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, // Agrega FooterComponent a las declaraciones
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
