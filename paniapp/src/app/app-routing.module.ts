import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';

const routes: Routes = [
  {path:"alumnos", component: AlumnosComponent},
  {path:"alumnos/form", component: FormularioAlumnoComponent},//RUTA PARA CREAR
  {path:"alumnos/form/edit/:id", component: FormularioAlumnoComponent}//RUTA PARA EDITAR
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
