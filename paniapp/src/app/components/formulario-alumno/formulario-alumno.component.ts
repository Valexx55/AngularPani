import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private alumnoServices:AlumnosService, private router:Router) { 
    this.alumno = new Alumno();
    this.en_edicion=false;
  }

  ngOnInit(): void {
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

    this.alumnoServices.postAlumnoConCabeceras(this.alumno).subscribe(
      {
        next:(mensaje_respuesta:HttpResponse<Alumno>) => {
          //objeto.alumnos = datos;
          
          console.log(mensaje_respuesta);
          let alumnorx : Alumno = mensaje_respuesta.body as Alumno;
          this.mostrarCabeceras(mensaje_respuesta); //mostramos las cabeceras
          if (mensaje_respuesta.status==201)
          {
            console.log("Alumno Insertado correctamente");
            alert("Alumno Insertado correctamente");
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
      }
    );

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

}
