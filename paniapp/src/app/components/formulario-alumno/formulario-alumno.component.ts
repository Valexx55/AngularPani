import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';


@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {

  alumno:Alumno;
  en_edicion:boolean; //como voy reutilar este componente tanto para la creación como para modificación, uso esta variable de control, para saber qué "uso" estoy

  constructor() { 
    this.alumno = new Alumno();
    this.en_edicion=false;
  }

  ngOnInit(): void {
  }

  crearAlumno():void
  {
    console.log(`ALUMNO nombre = ${this.alumno.nombre} apellido = ${this.alumno.apellido} edad = ${this.alumno.edad} email = ${this.alumno.email}`);
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
