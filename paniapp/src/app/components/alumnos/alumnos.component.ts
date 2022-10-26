import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {


  lista_alumnos!:Array<Alumno>;//esta es la lista visible
  
  constructor(private servicioAlumnos:AlumnosService) { }

  ngOnInit(): void {

    //TODO: MOSTRAR LOS ALUMNOS EN LA PLANTILLA 
    //let objeto = this;  
    this.servicioAlumnos.findAll().subscribe({
      next:(datos) => {
        //objeto.alumnos = datos;
        this.lista_alumnos = <Array<Alumno>> datos;
        //this.lista_alumnos = datos as Array<Alumno>; //Alumno[];
        console.log(this.lista_alumnos);
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
    });

    
  }

  borrarAlumno(id_alumno:number)
  {
    console.log("TOCADO borrarAlumno ALUMNO");
  }

  editarAlumno(alumno_editar:Alumno)
  {
    console.log("TOCADO editarAlumno ALUMNO");
  }

}
