import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faGhost, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observer } from 'rxjs';
import { CLAVE_ALUMNO_EDICION } from 'src/app/config/constantes';
import { Alumno } from 'src/app/models/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {


  iconoborrar: IconDefinition = faTrashAlt;
  iconoeditar: IconDefinition = faEdit;
  iconofantasma: IconDefinition = faGhost;
  lista_alumnos!:Array<Alumno>;//esta es la lista visible
  idInterval:any;

  automatico:boolean;

  observador:Observer<Array<Alumno>> = {
    next:(datos) => {
      //objeto.alumnos = datos;
      console.log("actualizando...");
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
  };

  constructor(private servicioAlumnos:AlumnosService, private router:Router) { 
    this.automatico =false;
  }
  ngOnDestroy(): void {
    //este método es invocado cuando se destruye el compoennte
    //cuando deja de ser visible para el usuario porque transito a otro generalmente
   console.log("ngOnDestroy()");
   //si hay una tarea programada de actualizar automáticamente, la desprogramar
    if (this.idInterval)
    {
      this.desProgramarActualizacionAutomatica();
    }

   // console.log("observador cerrado " +this.observador.closed);
   


  }

  ngOnInit(): void {

    
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

  actualizarFuncionConNombre ()
  {
    this.servicioAlumnos.findAll().subscribe(this.observador);
  }

  programarActualizacionAutomatica ()
  {
    this.idInterval = setInterval( () => {
      this.servicioAlumnos.findAll().subscribe(this.observador);
    }, 3000);
  }

  desProgramarActualizacionAutomatica ()
  {
    //TODO: programar este método hacer que pare de actualizarse
    console.log("desprogramo la actualización...");
    clearInterval(this.idInterval);
  }

  checkTocado()
  {
  
    this.automatico = !this.automatico;
    console.log("check tocado " + this.automatico);
    if (this.automatico)
    {
      this.programarActualizacionAutomatica ();
      //setInterval(this.actualizarFuncionConNombre, 3000);
    } else 
    {
      this.desProgramarActualizacionAutomatica ();
    }
    
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
    this.editarAlumnoConServicio(alumno_editar);
    /*
    console.log("TOCADO editarAlumno ALUMNO");
    //PARA PODER GUARDAR EL ALUMNO HAY QUE PASARLO A TEXTO: SERIALIZAR 
    let alumno_json:string =  JSON.stringify(alumno_editar);
    //GUARDAR EL ALUMNO A EDITAR EN LA MEMORIA - LOCAL STORAGE
    sessionStorage.setItem(CLAVE_ALUMNO_EDICION, alumno_json);
    this.router.navigate(["/alumnos/form/edit", alumno_editar.id ]);*/
  }

  editarAlumnoConServicio(alumno_editar:Alumno)
  {
    this.servicioAlumnos.setAlumnoEdicion(alumno_editar);
    this.router.navigate(["/alumnos/form/edit", alumno_editar.id ]);
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
