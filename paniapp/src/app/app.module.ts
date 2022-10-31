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

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    FormularioAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule, //cargo el módulo personalizado, para que pueda usarse todo lo que lleva en el
    HttpClientModule,
    FormsModule,//necesario para poder trabjar con Formularios Plantilla!
    FontAwesomeModule//FUENTES ICONOGRÁFICOS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
