import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * ESTE SERVICIO  VA A SER UNA TUBERÍa QUE COMUNIQUE
 * LOS COMPONENTES CAJA BUSQUEDA ("ESCRIBIR")
 * Y LISTADO BUSQUEDA ("LEER")
 */
@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

  private tuberiaPalabraBuscada:Subject<string>;
  public palabraNuevaAnunciada:Observable<String>;//"PUERTA DE SALIDA - A ESTE OBJETO DEBO SUSCRIBIRME"

  constructor() { 

    this.tuberiaPalabraBuscada = new Subject<string>();
    this.palabraNuevaAnunciada = this.tuberiaPalabraBuscada.asObservable();
  }



  comunicarNuevaBusqueda (termino:string)
  {
    //emitimos una señal y quienes estén suscritos a este "asunto" subject, se enterarán
    this.tuberiaPalabraBuscada.next(termino);
  }
}
