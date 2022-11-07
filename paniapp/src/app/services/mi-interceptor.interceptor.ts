import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("pasando por el interceptor MiInterceptorInterceptor a la IDA");
    return next.handle(request).pipe( respuesta => {console.log('A la VUELTA ...'); return respuesta;});//le dejo que pase
  }
}
