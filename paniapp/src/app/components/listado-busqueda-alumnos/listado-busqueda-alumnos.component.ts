import { Component, OnInit } from '@angular/core';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-listado-busqueda-alumnos',
  templateUrl: './listado-busqueda-alumnos.component.html',
  styleUrls: ['./listado-busqueda-alumnos.component.css']
})
export class ListadoBusquedaAlumnosComponent implements OnInit {

  constructor(private comService:ComunicadorService) { }

  ngOnInit(): void {
  }

}
