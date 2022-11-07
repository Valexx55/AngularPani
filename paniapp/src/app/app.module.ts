import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import {HttpClientModule} from '@angular/common/http';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusquedaPorNombreComponent } from './components/busqueda-por-nombre/busqueda-por-nombre.component';
import { CajaBusquedaAlumnosComponent } from './components/caja-busqueda-alumnos/caja-busqueda-alumnos.component';
import { ListadoBusquedaAlumnosComponent } from './components/listado-busqueda-alumnos/listado-busqueda-alumnos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalAlumnoComponent } from './components/modal-alumno/modal-alumno.component'

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    FormularioAlumnoComponent,
    BusquedaPorNombreComponent,
    CajaBusquedaAlumnosComponent,
    ListadoBusquedaAlumnosComponent,
    ModalAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule, //cargo el módulo personalizado, para que pueda usarse todo lo que lleva en el
    HttpClientModule,
    FormsModule,//necesario para poder trabjar con Formularios Plantilla!
    FontAwesomeModule, BrowserAnimationsModule,//FUENTES ICONOGRÁFICOS
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
