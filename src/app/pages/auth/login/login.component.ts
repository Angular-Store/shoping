import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form: FormGroup;
 loading = false;

  constructor( private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): any {
    console.log('LoginComponent');
  }

  Ingresar(): any {
    console.log(this.form);
    const email = this.form.value.email;
    const password = this.form.value.password

    if(email == 'Sergio' && password == '123456'){
      //redireccionar
      this.fakeLoading();
      console.log('Login correcto');
  } else {
    //mensaje de error
    this.error();
    this.form.reset();
  }

}
  error(){
    this._snackBar.open('Usuario o contraseña ingresado inválido', '',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    } ) 
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/'])
      //Redireccionamos al dashboard
    }, 1500);
  }
}
