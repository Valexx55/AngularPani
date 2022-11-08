import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MadridService {

  private static readonly URL_API_EVENTOS_MADRID = "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json?distrito_nombre="

  constructor(private http:HttpClient) { }

  obtenerEventos (distrito_nombre:string) : Observable<HttpResponse<any>>
  {
    let url_eventos = MadridService.URL_API_EVENTOS_MADRID+distrito_nombre;
    console.log("Llamando a " + url_eventos);
    return this.http.get<any>(MadridService.URL_API_EVENTOS_MADRID+distrito_nombre, { observe: 'response' });
  }
}
