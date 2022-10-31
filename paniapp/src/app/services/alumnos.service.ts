import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  cabeceras : HttpHeaders = new HttpHeaders({'Content-type':'application/json'});

  //static readonly URL_ALUMNOS:string = "https://my-json-server.typicode.com/valexx55/alumnostardes/alumno";

  static readonly URL_ALUMNOS:string = "http://localhost:3000/alumnos";

  constructor(private clienteHttp : HttpClient) { }

  //findAll() : Observable<Array<Alumno>> {
  findAll() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS);
  }

  findAllConCabeceras() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS, { observe: 'response' });
  }

  postAlumno (alumno:Alumno) : Observable<Alumno>
  {
    return this.clienteHttp.post<Alumno>(AlumnosService.URL_ALUMNOS, alumno, {headers:this.cabeceras});
  }


  postAlumnoConCabeceras (alumno:Alumno) : Observable<HttpResponse<Alumno>>
  {
    //return this.clienteHttp.post<HttpResponse<Alumno>>(AlumnosService.URL_ALUMNOS, alumno, {headers:this.cabeceras,  observe: "response" as 'body'});
    return this.clienteHttp.post<Alumno>(AlumnosService.URL_ALUMNOS, alumno, {headers:this.cabeceras,  observe: 'response'});
  }

  //versión Óscar
  //public postAlumnoResponseCompleto(alumno : Alumno) : Observable<HttpResponse<Alumno>> {
  //  return this.clienteHttp.post<Alumno>(AlumnosService.URL_ALUMNOS, alumno, {headers: this.cabeceras, observe: 'response'});
  //}

  deleteAlumno (id:number) : Observable<any>
  {
    return this.clienteHttp.delete<any>(AlumnosService.URL_ALUMNOS+"/"+id);
  }
}
