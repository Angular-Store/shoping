import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): any {
    // console.log('LoginComponent');
  }



  decodeToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const payloadJSON = JSON.parse(payloadDecoded);
      localStorage.setItem('user', JSON.stringify(payloadJSON.user));
      return payloadJSON;
    } else {
      return null;
    }
  }


  Ingresar(): any {
    // console.log(this.form);
    const username = this.form.value.username;
    const password = this.form.value.password;

//url de la api con enviroment
    const url: string = environment.api;
    const URL = `${url}/api/login`;
    
    //const URL = 'https://angular-store.onrender.com/api/login';


    this.http.post(URL, { username, password }).subscribe((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.fakeLoading();
        this.decodeToken();
      } else {
        this.error();
        this.form.reset();
      }
    }
      , (err) => {
        console.log(err);
        this.error();
        this.form.reset();
      }
    )

  }



  error() {
    this._snackBar.open('Usuario o contraseña ingresado inválido', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 1500);
}
}

