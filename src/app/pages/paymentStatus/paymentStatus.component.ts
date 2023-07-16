import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-status',
  templateUrl: './paymentStatus.component.html',
  styleUrls: ['./paymentStatus.component.css']
})
export class PaymentStatusComponent implements OnInit {
  constructor(private route:ActivatedRoute, private http: HttpClient) {
 }

  ngOnInit() {
    const cartID = this.route.snapshot.params['cardID'];
    const url = `http://localhost:8080/api/orders/cart/${cartID}`;
    this.http.get<any>(url).subscribe((data) => {
      console.log(data);
    });    
  }
}
