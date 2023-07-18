//Importar librerias necesarias para el funcionamiento del componente y del formulario.
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';

//Se importa el modulo de rutas para poder redireccionar al usuario  y el modulo de http para poder hacer peticiones.
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//Se importan los modulos de angular material.
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/enviroment/enviroment';


//creación automática del componente
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


//Componente a exportar: RegisterComponent
export class RegisterComponent implements OnInit {

  register: FormGroup;                            //Se crea una variable de tipo FormGroup para el formulario.
  message: string = '';                           //Se crea una variable de tipo string para el mensaje de error.

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {     //
    this.register = this.fb.group({               //Se crea el formulario con los campos requeridos.
      fullName: ['', Validators.required],        //Se crea la opción para que sea obligatorio ingresar el nombre completo para poder enviar la solicitud.
      username: ['', Validators.required],        //Se crea la opción para que sea obligatorio ingresar el usuario para poder enviar la solicitud.
      email: ['', Validators.required],           //Se crea la opción para que sea obligatorio ingresar el correo para poder enviar la solicitud.
      phone: ['', Validators.required],           //Se crea la opción para que sea obligatorio ingresar el teléfono para poder enviar la solicitud.
      address: ['', Validators.required],         //Se crea la opción para que sea obligatorio ingresar la dirección para poder enviar la solicitud.
      password: ['', Validators.required],        //Se crea la opción para que sea obligatorio ingresar la contraseña para poder enviar la solicitud.
    })

  }

  //ngOnInit se utiliza para inicializar propiedades y configuraciones iniciales del componente
  ngOnInit(): any {
  }

  //Función para registrar un usuario
  Registrar(): any {                               //Se crea la función para registrar un usuario.
    console.log(this.register);
    const user = {                                 //Se crea una variable de tipo objeto para almacenar los datos del usuario.
      username: this.register.value.username,      //Se almacena el usuario ingresado en el formulario.
      fullName: this.register.value.fullName,      //Se almacena el nombre completo ingresado en el formulario.
      email: this.register.value.email,            //Se almacena el correo ingresado en el formulario.
      phone: this.register.value.phone,            //Se almacena el teléfono ingresado en el formulario.
      address: this.register.value.address,        //Se almacena la dirección ingresada en el formulario.
      password: this.register.value.password       //Se almacena la contraseña ingresada en el formulario.
    }

    //Se crea una variable de tipo constante para almacenar la URL de la API.
     const url= environment.api
    const URL = `${url}/api/users`;

    //Se hace una petición POST a la API para registrar un usuario.
    this.http.post(URL, user).subscribe(           //Se hace la petición POST a la API.
      (res: any) => {
        this.message = res.message;                //Se almacena el mensaje de respuesta de la API.
        this.fakeLoading();                        //Se llama a la función fakeLoading para redireccionar al usuario.
      },
      (err: any) => {                              //Se captura el error en caso de que no se pueda registrar el usuario.
        this.message = err.message;                 //Se almacena el mensaje de error.
      }
    )
  }


  //Función para mostrar un mensaje de error
  error() {
    this.snackBar.open('Datos ingresados inválidos', '', {  //Se muestra un mensaje de error.
      duration: 3000,                                       //Se establece la duración del mensaje.
      horizontalPosition: 'center',                         //Se establece la posición horizontal del mensaje.
      verticalPosition: 'top'                               //Se establece la posición vertical del mensaje.
    })
  }


  //Se crea la función fakeLoading para redireccionar al usuario.
  fakeLoading() {
    // this.loading = true;
    setTimeout(() => {                                      //Se establece un tiempo de espera de 1.5 segundos.
      this.router.navigate(['/login']).then(() => {         //Se redirecciona al usuario a la página de login.
        window.location.reload();                           //Se recarga la página.
      });
    }, 1500);
  }
}
