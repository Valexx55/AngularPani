import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { Observable } from 'rxjs';

import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { HttpResponse } from '@angular/common/http';
import { AlumnosService } from './alumnos.service';
import { Alumno } from '../models/alumno';

describe('AlumnoService', () => {
  let service: AlumnosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule], providers: [AlumnosService] });
    service = TestBed.inject(AlumnosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

 

  it('GET listado de alumnos', () => {
    
    const listaAlumnosFalsa: Alumno[] = [{
      "id": 14,
      "nombre": "Tigre",
      "apellido": "de bengala",
      "email": "vinis@g.es",
      "edad": 35,
      "creadoEn": "2021-09-27T07:55:21.449+00:00",
      "fotoHashCode": "35659859"
      }];

      service.findAllConCabeceras().subscribe(data => {
        expect(data.status).toBe(200);
        expect(data.body?.length).toBe(1);
        
       
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('https://my-json-server.typicode.com/valexx55/alumnostardes/alumno');
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBe(null);
      // Then we set the fake data to be returned by the mock
      req.flush(listaAlumnosFalsa);
    });

    it('crear nuevo alumno', () => {
      const nuevoAlumno: Alumno = {
        "id": 14,
        "nombre": "Tigre",
        "apellido": "de bengala",
        "email": "vinis@g.es",
        "edad": 35,
        "creadoEn": "2021-09-27T07:55:21.449+00:00",
        "fotoHashCode": "35659859"
        };
  
        service.postAlumno(nuevoAlumno).subscribe(
        data => {expect(data).toEqual(nuevoAlumno);}
      );
  
      
      const req = httpMock.expectOne("https://my-json-server.typicode.com/valexx55/alumnostardes/alumno");
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(nuevoAlumno);
  
      
      const expectedResponse = new HttpResponse({ status: 201, body: nuevoAlumno });
      req.event(expectedResponse);
      
    });
  

   
    afterEach(() => {
      httpMock.verify(); //comprueba que no hay una llamada pendiente entre cada test. que se está llamando, vaya.
    });
});
