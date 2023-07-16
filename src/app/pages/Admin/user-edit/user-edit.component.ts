import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  loading: boolean = true;
  disabled: boolean = true;
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userID: number = 1; // Replace with the actual user ID
    const url: string = 'https://angular-store.onrender.com';

    // Obtener usuario desde la API
    this.http.get(`${url}/api/users/${userID}`).subscribe(
      (response: any) => {
        this.user = response;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  editUser() {
    this.disabled = false;
  }

  saveUser() {
    this.loading = true;
    const url: string = 'https://angular-store.onrender.com';

    // Enviar información a la API
    const userID: number = 1; // Replace with the actual user ID

    this.http.put(`${url}/api/users/${userID}`, this.user).subscribe(
      (response: any) => {
        this.disabled = true;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }
}
