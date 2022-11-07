import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/models/marcador';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.css']
})
export class MarcadorComponent implements OnInit {


  marcador_actual:Marcador;
  nombrejugadormarcador:string;

  constructor() { 
    this.nombrejugadormarcador='';
    this.marcador_actual = new Marcador();
  }

  ngOnInit(): void {
  }

  /**
   * 
   * @param resultado -1 si gana la máquina 1 gana el jugador 0 empate
   */
  actualizarMarcador(resultado: number)
  {

    switch(resultado)
    {
      case -1:
        //hay que incrementar el macardor de la máquina
          this.marcador_actual.puntuacion_maquina++;
        break;
      case 0:
         //hay que incrementar el macardor de los dos
        this.marcador_actual.puntuacion_maquina++;
        this.marcador_actual.puntuacion_jugador++;
        break;
      case 1:
       //hay que incrementar el macardor del jugador
        this.marcador_actual.puntuacion_jugador++;
        break;

    }
  }

}
