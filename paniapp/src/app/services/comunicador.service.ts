import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor() { 

    this.tuberiaPalabraBuscada = new Subject<string>();
   
  }

  comunicarNuevaBusqueda (termino:string)
  {
    //emitimos una señal y quienes estén suscritos a este "asunto" subject, se enterarán
    this.tuberiaPalabraBuscada.next(termino);
  }
}
