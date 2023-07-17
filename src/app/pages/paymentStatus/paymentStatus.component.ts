import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-payment-status',
  templateUrl: './paymentStatus.component.html',
  styleUrls: ['./paymentStatus.component.css']
})
export class PaymentStatusComponent implements OnInit {
  loading: boolean = true;
  order: any;
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    const cartID = this.route.snapshot.params['cartID'];
    console.log(cartID)
    // const url = `${environment.api}/api/orders/cart/${cartID}`;
    const url = `http://localhost:8080/api/orders/cart/1`;
    this.http.get<any>(url).subscribe(
      (response: any) => {
        console.log(response)
        this.order = {
          id: 1,
          cartID: 1,
          userID: 1,    
          status: 'pending',
          total: 98,
        };
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }
}
