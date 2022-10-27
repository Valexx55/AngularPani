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
    this.servicioAlumnos.deleteAlumno(id_alumno).subscribe(
      {
        next:(datos) => {
          //objeto.alumnos = datos;
          //console.log(datos);
          //de la lista de alumnos, tengo que filtrar/eliminar al que tenga el id del borrado
          this.lista_alumnos = this.lista_alumnos.filter(alumno => {return alumno.id != id_alumno} );
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
    )
  }

  editarAlumno(alumno_editar:Alumno)
  {
    console.log("TOCADO editarAlumno ALUMNO");
  }

  ordenarPorEdad()
  {
    console.log("ordenarPorEdad()");
    this.lista_alumnos.sort( //si edad de alumno1 es mayor, devuelvo positivo. si es menor, negativo y son iguales, 0
      (alumno1:Alumno, alumno2:Alumno) => {
       /* let resultado:number=0;
       if (alumno1.edad>alumno2.edad) 
       {
        resultado = 1;
       }
        
      else if (alumno1.edad<alumno2.edad) 
      {
        resultado = -1;
      }
        
        else 
        {
          resultado = 0;//son iguales
        }
       return resultado;*/
        //return alumno1.edad-alumno2.edad;
        return alumno2.edad-alumno1.edad;  
      }
    );
  }

}
