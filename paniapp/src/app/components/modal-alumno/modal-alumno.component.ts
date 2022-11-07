import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';

@Component({
  selector: 'app-modal-alumno',
  templateUrl: './modal-alumno.component.html',
  styleUrls: ['./modal-alumno.component.css']
})
export class ModalAlumnoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public alumno: Alumno) {
    console.log(this.alumno.apellido);
  }

  ngOnInit(): void {
  }

}
