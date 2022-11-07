import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { BusquedaPorNombreComponent } from './components/busqueda-por-nombre/busqueda-por-nombre.component';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { JuegoPptComponent } from './components/juego-ppt/juego-ppt.component';

const routes: Routes = [
  {path:"alumnos", component: AlumnosComponent},
  {path:"alumnos/form", component: FormularioAlumnoComponent},//RUTA PARA CREAR
  {path:"alumnos/form/edit/:id", component: FormularioAlumnoComponent},//RUTA PARA EDITAR
  {path:"busquedapornombre", component: BusquedaPorNombreComponent},
  {path:"ppt", component: JuegoPptComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
