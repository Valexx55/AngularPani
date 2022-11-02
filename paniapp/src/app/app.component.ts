import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'paniapp';
  ultima_conexion:string;

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    let fechaactual: string = new Date().toString();
    console.log("FECHA ACTUAL = " + fechaactual);
    //TODO: haced que cuando entre el app, se muestre la fecha de la última conexión
    //usando el localStorage
    this.ultima_conexion = this.obtenerYActuaizarUltimaConexion();
  }

  obtenerYActuaizarUltimaConexion () :string {
    let ultima_vez:string | null; //EJEMPLO DE UNION TYPES
    let momento_actual:string = '';

      ultima_vez = localStorage.getItem('ultima_vez');

      momento_actual = new Date().toString();
    
       if (ultima_vez == null)
       {
        //es la primera vez que se conecta y no hay registro
        ultima_vez = momento_actual;
       }

       //haya o no registro, hay que actualizar
       localStorage.setItem('ultima_vez', momento_actual);


    return ultima_vez;
  }
}
