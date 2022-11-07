import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MiInterceptor2Interceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("pasando por el interceptor MiInterceptorInterceptor 2 a la IDA");

    //request "inmutable"
    let cuerpo = request.serializeBody();
    console.log("cuerpo  " + cuerpo); //el cuerpo es null pq es un get
    let req_nueva = request.clone ({ //ejemplo de añadir una cabecera al paquete de ida
      setHeaders: 
      {
        miciudad: 'SEBASTOPOL'
      }
    });

    return next.handle(req_nueva)//llama
    .pipe( 
      map ((event: HttpEvent<any>) =>
      {
        if (event instanceof HttpResponse)//YA HE LLEGADO LA RESPUESTA
        { 
          this.mostrarCuerpo(event.body);
          event = event.clone ({body: this.modificarCuerpo(event.body)})
        }
        return event;
      })
    );//
  }

  private mostrarCuerpo (cuerpo:any)
  {
    console.log("cuerpo RX " + cuerpo.toString());
  }

  private modificarCuerpo (cuerpo:any)
  {
    console.log("cuerpo RX " + cuerpo);//AQUÍ PODRÍA MODIFICAR O AÑADIR INFO AL CUERPO DE LA RESPUESTA HTTP
    return cuerpo;
  }
}
