import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { CLAVE_ALUMNO_EDICION } from 'src/app/config/constantes';
import { Alumno } from 'src/app/models/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';


@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {

  alumno:Alumno;
  en_edicion:boolean; //como voy reutilar este componente tanto para la creación como para modificación, uso esta variable de control, para saber qué "uso" estoy

  observador:Observer<HttpResponse<Alumno>>;

  constructor(private alumnoServices:AlumnosService, private router:Router) { 
    this.alumno = new Alumno();
    this.en_edicion=false;
    this.observador =  {
      next:(mensaje_respuesta:HttpResponse<Alumno>) => {
        //objeto.alumnos = datos;
        
        console.log(mensaje_respuesta);
        let alumnorx : Alumno = mensaje_respuesta.body as Alumno;
        this.mostrarCabeceras(mensaje_respuesta); //mostramos las cabeceras
        if (mensaje_respuesta.status==201||mensaje_respuesta.status==200)
        {
          console.log("Alumno ACTUALIZADO correctamente");
          alert("Alumno ACTUALIZADO correctamente");
          this.router.navigateByUrl("/alumnos");
        }
      },
      error:(error: HttpErrorResponse) => {
        console.error("Error" + error.name);
        console.error("Error" + error.message);
        console.error("Error" + error.error);
        console.error("Error" + error.ok);
      },
      complete: () => {
        console.log("Complete");
      }
    };
  }

  ngOnInit(): void {

    //AL ENTRAR, NECESITO SABER SI ESTOY EDITANDO O CREANDO
    let url = location.href;
    console.log("URL = " + url);

    this.en_edicion = this.estoyEnEdicion(url);
    if (this.en_edicion)
    {
      //venimos a editar
      console.log("ESTAMOS EDITANDO");
      //VOY A CARGAR EL ALUMNO QUE ESTOY EDITANDO
      //TODO:, leer el alumno de la memoria / desrializar
       
      //this.alumno = this.obtenerAlumnoEnEdicion (); //obtengo el alumno del Local Storage
      this.alumno = this.alumnoServices.getAlumnoEdicion(); //obtengo el alumno del Servicio

    } else {
      //venimos a crear
      console.log("ESTAMOS CREANDO");
    }

  }

  obtenerAlumnoEnEdicion ():Alumno
  {
    let alumno_edicion : Alumno;
    let alumno_json : string;

       alumno_json = sessionStorage.getItem(CLAVE_ALUMNO_EDICION);
       if (alumno_json!=null)
       {
        console.log("alumno en edición " + alumno_json);
        //TEXTO A OBJETO/VARIABLE - DESERIALIZAR
        alumno_edicion = JSON.parse(alumno_json);
       }

    return alumno_edicion;

  }

  //implmentando esta función
  estoyEnEdicion (direccion:string):boolean{
    let edicion:boolean = false;

        edicion = direccion.indexOf('edit')!=-1;//si contiente edit, devolvera distinto de menos

    return edicion;
  }


  mostrarCabeceras (http_response: HttpResponse<Alumno>)
  {
    //tipo mime
    console.log("TIPO MIME = "+ http_response.headers.get('content-type'));
    //status
    console.log("STATUS = "+ http_response.status);
    //status text
    console.log("NOMBRE STATUS= "+ http_response.statusText);

    const keys = http_response.headers.keys();
    keys.map(key => console.log(`${key}: ${http_response.headers.get(key)}`));

  }


  crearAlumno():void
  {
    console.log(`ALUMNO nombre = ${this.alumno.nombre} apellido = ${this.alumno.apellido} edad = ${this.alumno.edad} email = ${this.alumno.email}`);
    /*this.alumnoServices.postAlumno(this.alumno).subscribe(
      {
        next:(alumno_rx:Alumno) => {
          //objeto.alumnos = datos;
          
          console.log(alumno_rx);
        },
        error:(error: HttpErrorResponse) => {
          console.error("Error" + error.name);
          console.error("Error" + error.message);
          console.error("Error" + error.error);
          console.error("Error" + error.ok);
        },
        complete: () => {
          console.log("Complete");
        }
      }
    );*/
    this.alumnoServices.postAlumnoConCabeceras(this.alumno).subscribe(this.observador);

  }

  estiloBoton():string
  {
    let estilo_dev:string = '';

    if (this.en_edicion)
    {
      estilo_dev = "btn btn-success";//del botón verde
    } else {
      estilo_dev = "btn btn-primary";//del botón primary
    }

    return estilo_dev;
  }

  modificarAlumno ()
  {
    console.log(" modificarAlumno ()");

    this.alumnoServices.putAlumno(this.alumno.id, this.alumno).subscribe(this.observador);


  }

}
