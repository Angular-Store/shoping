import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

interface MatCarouselSlide {
  imageUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carruselProducts',
  templateUrl: './carruselProducts.component.html',
  styleUrls: ['./carruselProducts.component.css']
})
export class CarruselProductsComponent implements OnInit {
  slides: MatCarouselSlide[] = [];
  translateX = 0;
  currentIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = `${environment.api}/api/products`;
    this.http.get<any[]>(url).subscribe(response => {
      this.slides = response.map(product => ({
        imageUrl: product.productImages[0].imageURL,
        title: product.productName,
        description: product.description
      }));
      this.startCarousel();
    });
  }

  startCarousel() {
    setInterval(() => {
      this.slideRight();
    }, 1000);
  }

  slideRight() {
    this.currentIndex++;
    if (this.currentIndex >= this.slides.length) {
      this.currentIndex = 0;
    }
    this.translateX = -this.currentIndex * 100;
    console.log(this.currentIndex);
  
    if (this.translateX === -600) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.translateX = 0;
      }, 1000);
    }
  }
  slideLeft() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.slides.length - 1;
    }
    this.translateX = -this.currentIndex * 100;
  }
}
