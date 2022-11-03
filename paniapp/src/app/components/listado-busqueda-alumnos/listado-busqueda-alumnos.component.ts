import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-listado-busqueda-alumnos',
  templateUrl: './listado-busqueda-alumnos.component.html',
  styleUrls: ['./listado-busqueda-alumnos.component.css']
})
export class ListadoBusquedaAlumnosComponent implements OnInit, OnDestroy {

  lista_alumnos!: Array<Alumno>;
  subscriptor:Subscription;

  @Input() tiroDeGitHub:boolean;

  constructor(private comService:ComunicadorService, private alumnoService: AlumnosService) { 

    this.lista_alumnos = new Array<Alumno>();
    this.subscriptor = this.comService.palabraNuevaAnunciada.subscribe(
      termino_busqueda_introducido => {
        
        console.log("busqueda intro = " + termino_busqueda_introducido);

        if (termino_busqueda_introducido =='')
        {
          this.lista_alumnos.length=0;
        } else 
        {
          if (this.tiroDeGitHub)
          {
            //el padre quiere que busque en GITHUB
            this.busquedaAlumnosEnGitHUB (termino_busqueda_introducido.toString());
          } else 
          {
            //buscamos en JSON SERVER
            this.busquedaAlumnosEnJSONServer(termino_busqueda_introducido.toString());
          }
          
        }
        
        
      }
    )
  }
  ngOnDestroy(): void {
    //dejo de escuchar "la tubería del servicio", prevengo "perdidas de memoria" -memory leaks
    this.subscriptor.unsubscribe();
  }

  ngOnInit(): void {
  }

  alumnoTocado(alumno:Alumno)
  {
    console.log("alumnoTocado");
  }

  busquedaAlumnosEnGitHUB (termino:string)
  {
    this.alumnoService.findAllGitHub().subscribe(
      {
        next:(datos) => {
          //objeto.alumnos = datos;
          console.log(this.lista_alumnos);
          let alumnos_array_aux: Array<Alumno> = <Array<Alumno>> datos;
          this.lista_alumnos = alumnos_array_aux.filter(alumno => {return (alumno.nombre.indexOf(termino)!=-1 || alumno.apellido.indexOf(termino)!=-1);} );
          if (this.lista_alumnos.length==0)
          {
            alert("Su búsqueda no produjo resultados");

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
    )
  }

  //TIENE QUE COINCIR EL NOMBRE COMPLETO si no JSON SERVER NO VA
  //TODO: buscar por pulsaciones tipog GOOLGE
  busquedaAlumnosEnJSONServer (termino:string)
  {
    this.alumnoService.findByNombre(termino).subscribe(
      {
        next:(datos) => {
          //objeto.alumnos = datos;
          console.log(this.lista_alumnos);
          this.lista_alumnos = <Array<Alumno>> datos;
          if (this.lista_alumnos.length==0)
          {
            alert("Su búsqueda no produjo resultados");

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
    )

}
}
