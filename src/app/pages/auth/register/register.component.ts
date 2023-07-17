import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



  export class RegisterComponent implements OnInit {
  
    register: FormGroup;
    message: string = '';

    constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
      this.register = this.fb.group({
        fullName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        password: ['', Validators.required],
      })

    }
  
    ngOnInit(): any {
    }


    Registrar(): any{
      console.log(this.register);
      const user = {
         username: this.register.value.username,
         fullName: this.register.value.fullName,
         email: this.register.value.email,
         phone: this.register.value.phone,
         address: this.register.value.address,
         password: this.register.value.password
      }
      

      const URL = 'https://angular-store.onrender.com/api/users';


      this.http.post(URL, user).subscribe(
        (res: any) => {
        this.message = res.message;
        this.fakeLoading();
    }, 
    (err: any) => {
        this.message = err.message;
    }
    )   
  }



  error() {
    this.snackBar.open('Datos ingresados inválidos', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

    fakeLoading() {
      // this.loading = true;
      setTimeout(() => {
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }, 1500);
  }
}