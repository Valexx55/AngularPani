import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-caja-busqueda-alumnos',
  templateUrl: './caja-busqueda-alumnos.component.html',
  styleUrls: ['./caja-busqueda-alumnos.component.css']
})
export class CajaBusquedaAlumnosComponent implements OnInit, AfterViewInit {

//! non - null operator
  @ViewChild('cajabusqueda') caja_input:ElementRef;//ElementRef: envolotorio para las etiquetas HTML Estándar
  termino_busqueda:string;

  constructor(private comService:ComunicadorService) { 

    //aquí 
    //console.log(this.caja_input.nativeElement.value);
    this.termino_busqueda='';
  }
  ngAfterViewInit(): void {
    //este método, se invoca una vez "angular"  ha cargado la plantilla asociada al componente HTML
    console.log(this.caja_input.nativeElement.value);
  }

  //TODO: crear enlace al componente padre Búsqueda app routing y menusuperior
  ngOnInit(): void {
   
  }

  busqueda1()
  {
    console.log("Busqueda1 - lupa/equis tocada");
  }


  busqueda2()
  {
    console.log("Busqueda2 - tocado Intro");
    let caja_busqueda : HTMLInputElement = <HTMLInputElement>this.caja_input.nativeElement;
    this.termino_busqueda = caja_busqueda.value;
    console.log("A buscar ...");
    this.comService.comunicarNuevaBusqueda(this.termino_busqueda);
    
  }

  busqueda21(evento:Event)
  {
    console.log("Busqueda21- "+ evento.target);
    let caja_busqueda : HTMLInputElement = <HTMLInputElement>evento.target;
    console.log("cadenda busqueda = " +caja_busqueda.value);

  }

  busqueda3()
  {
    console.log("Busqueda3 - tras pulsar cualquier tecla");
  }


}
