import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  loading: boolean = true;
  disabled: boolean = true;
  user: any;
  message: string = '';
  userID: number = 1;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url: string = environment.api;

    // Retrieve userID from localStorage
    const localStorageUser = localStorage.getItem('user');
    // Check if userID exists in localStorage
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      this.userID = user.userID;
    } else {
      console.error('userID not found in localStorage');
    }

    // Obtener usuario desde la API
    this.http.get(`${url}/api/users/${this.userID}`).subscribe(
      (response: any) => {
        this.message = response.message;
        this.user = response;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.message = error.message;
        this.loading = false;
      }
    );
  }


  editUser() {
    this.disabled = false;
  }

  saveUser() {
    this.loading = true;
    const url: string = environment.api;

    // Enviar información a la API
    this.http.put(`${url}/api/users/${this.userID}`, this.user).subscribe(
      (response: any) => {
        this.message = response.message;
        this.disabled = true;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
