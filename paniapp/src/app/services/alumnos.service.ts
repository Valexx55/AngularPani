import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  static readonly URL_ALUMNOS:string = "https://my-json-server.typicode.com/valexx55/alumnostardes/alumno";

  constructor(private clienteHttp : HttpClient) { }

  //findAll() : Observable<Array<Alumno>> {
  findAll() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS);
  }
}
