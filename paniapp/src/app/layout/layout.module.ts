import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusuperiorComponent } from './menusuperior/menusuperior.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    MenusuperiorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule //para poder usar directivas de navegación, porque voy a hacer menú, dentro de MenuSuperiorComponent
  ],
  exports: [
    MenusuperiorComponent //"hago público" EL COMPONENTE, para que pueda usarse en toda la aplicación
  ]
})
export class LayoutModule { }
