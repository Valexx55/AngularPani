import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  cabeceras : HttpHeaders = new HttpHeaders({'Content-type':'application/json'});

  alumnoEdicion: Alumno;//ALAMACEN TEMPORAL


  //este método lo invocamos desde el listado
  setAlumnoEdicion (alumno:Alumno):void
  {
    this.alumnoEdicion = alumno;
  }

  //y este lo invocamos desde el formulario (cuando estemos en edición)
  getAlumnoEdicion ():Alumno
  {
    return this.alumnoEdicion;
  }

  static readonly URL_ALUMNOS_GITHUB:string = "https://my-json-server.typicode.com/valexx55/alumnostardes/alumno";

  static readonly URL_ALUMNOS:string = "http://localhost:3000/alumnos";

  constructor(private clienteHttp : HttpClient) { }

  //findAll() : Observable<Array<Alumno>> {
  findAll() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS);
  }

  findAllGitHub() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS_GITHUB);
  }

  //GET /comments?author.name=typicode

  findByNombre(termino:string) : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS+"?nombre="+termino);
  }

  findAllConCabeceras() : Observable<any> {
    return this.clienteHttp.get<Array<Alumno>>(AlumnosService.URL_ALUMNOS_GITHUB, { observe: 'response' });
  }

  postAlumno (alumno:Alumno) : Observable<Alumno>
  {
    return this.clienteHttp.post<Alumno>(AlumnosService.URL_ALUMNOS_GITHUB, alumno, {headers:this.cabeceras});
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

  putAlumno (id:number, alumno:Alumno):Observable<HttpResponse<Alumno>>
  {
    return this.clienteHttp.put<Alumno>(AlumnosService.URL_ALUMNOS+"/"+id, alumno, {headers:this.cabeceras,  observe: 'response'});
  }
}
