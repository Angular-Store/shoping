//Importar librerias necesarias para el funcionamiento del componente y del formulario.
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';

//Se importan las rutas necesarias para el enrutamiento.
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

//Se importan los modulos de angular material.
import { MatSnackBar } from '@angular/material/snack-bar';


//Creación automática del componente
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//Componente a exportar: LoginComponent
export class LoginComponent implements OnInit {
  form: FormGroup;  //Se crea una variable de tipo FormGroup para el formulario.
  loading = false;  //Se crea una variable de tipo literal false para el estado de carga del formulario.

  //Se crea un constructor para el formulario, el snackbar, el enrutamiento y el cliente http.
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', Validators.required], //Se crea la opción para que sea obligatorio ingresar el usuario para poder enviar la solicitud.
      password: ['', Validators.required] //Se crea la opción para que sea obligatorio ingresar la contraseña para poder enviar la solicitud.
    });
  }


  //ngOnInit se utiliza para inicializar propiedades y configuraciones iniciales del componente
  ngOnInit(): any {
    // console.log('LoginComponent');
  }



  //Función para decodificar el token y obtener el usuario.
  decodeToken(): any {                                                 //Puede recibir cada valor.
    const token = localStorage.getItem('token');                       //Se crea una variable para obtener el token del localstorage.
    if (token) {                                                       //Condición que verifica si el token existe.
      const payload = token.split('.')[1];                             //Se crea una variable para obtener la parte después del punto del token.
      const payloadDecoded = atob(payload);                            //Se decodifica el token.
      const payloadJSON = JSON.parse(payloadDecoded);                  //Se convierte a JSON el token decodificado.
      localStorage.setItem('user', JSON.stringify(payloadJSON.user));  //Se guarda en el localstorage el usuario.
      return payloadJSON;                                              //Se retorna el usuario.    
    } else {
      return null;                                                     //Si no existe el token se retorna null.
    }
  }

  //Función para ingresar al aplicativo.
  Ingresar(): any {
    const username = this.form.value.username;                         //Se crea una variable para obtener el valor del usuario.                
    const password = this.form.value.password;                         //Se crea una variable para obtener el valor de la contraseña.

    //url de la api con enviroment
    const url: string = environment.api;                               //Se crea una variable para obtener la url de la api.
    const URL = `${url}/api/login`;                                    //Se crea una variable para obtener la url de la api con el endpoint.

    //Se envía la solicitud POST a la api.
    this.http.post(URL, { username, password }).subscribe((res: any) => {  
      if (res.token) {                                                 //Condición que verifica si existe el token.
        localStorage.setItem('token', res.token);                      //Se guarda el token en el localstorage.
        this.fakeLoading();                                            //Se llama a la función fakeLoading.
        this.decodeToken();                                            //Se llama a la función decodeToken.
      } else {
        this.error();                                                  //Se llama a la función error.
        this.form.reset();                                             //Se resetea el formulario
      }
    }
      , (err) => {                                                     //Si existe un error se muestra en consola y se llama a la función error.
        console.log(err);
        this.error();
        this.form.reset();
      }
    )

  }


  //Función para mostrar el mensaje de error.
  error() {
    this._snackBar.open('Usuario o contraseña ingresado inválido', '', {//Se muestra el mensaje de error usando snackbar de angular material.
      duration: 3000,                                                   //Duración del mensaje.
      horizontalPosition: 'center',                                     //Posición horizontal del mensaje.
      verticalPosition: 'top'                                           //Posición vertical del mensaje.
    })
  }

  //Función para simular el tiempo de carga.
  fakeLoading() {
    this.loading = true;                                                //Se cambia el estado de carga a true.
    setTimeout(() => {                                                  //Se crea un tiempo de espera de 1.5 segundos.
      this.router.navigate(['/']).then(() => {                          //Se redirecciona al home.
        window.location.reload();                                       //Se recarga la página.
      });
    }, 1500);
  }
}

