import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-payment-status',
  templateUrl: './paymentStatus.component.html',
  styleUrls: ['./paymentStatus.component.css']
})
export class PaymentStatusComponent implements OnInit {
  loading: boolean = true;
  order: any; 
  message: string = '';
  cartID: string = ''; 
  userID: string = ''; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {} // Constructor: creates an instance of the PaymentStatusComponent component

  ngOnInit() {
    // Lifecycle hook called after the component has been initialized
    const userJson: string = localStorage.getItem('user')!;
    const user = JSON.parse(userJson);
    this.userID = user.userID; // Get the userID from local storage

    const url: string = environment.api; // Get the API base URL from environment configuration
    this.http.get(`${url}/api/orders/user/${this.userID}`).subscribe(
      (response: any) => {
        // Success callback, handle the response from the API
        this.order = response; // Assign the API response to the 'order' variable
        this.loading = false; // Set loading to false as data loading is complete
      },
      (error: any) => {
        // Error callback, handle any errors that occurred during API call
        console.error(error);
      }
    );
  }
}
