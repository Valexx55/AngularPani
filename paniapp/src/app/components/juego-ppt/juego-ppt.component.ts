import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MarcadorComponent } from '../marcador/marcador.component';

@Component({
  selector: 'app-juego-ppt',
  templateUrl: './juego-ppt.component.html',
  styleUrls: ['./juego-ppt.component.css']
})
export class JuegoPptComponent implements OnInit, AfterViewInit {


  //gracias a esto, ya puedo modificar el componente hijo
  @ViewChild(MarcadorComponent) marcador_componente: MarcadorComponent;
  //acceder por el nombre de la plantila #
  //@ViewChild('marcador') marcador_componente: MarcadorComponent;

  //para tener una colección de hijos del mismo tipo
  //@ViewChildren(MarcadorComponent) marcadores?:QueryList<MarcadorComponent>;
  
  nombrejugadorjuego: string;
  seleccionado: boolean = false;
  ids_botones: Array<string> = ["piedra", "papel", "tijera"];
  img_botones: Array<string> = ["rock", "paper", "scissors"];

  tabla_decision: Array<Array<number>> = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0]
  ];

  constructor() { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.marcador_componente.nombrejugadormarcador="PEPE";
    // console.log("hay " + this.marcadores.length + "marcadores");
  }

  selectPlay(play: number) {

    this.seleccionado = true;
    localStorage.setItem("selected", play.toString());

    this.decorateSelectedPlay(play);
  }

  decorateSelectedPlay(play: number) {

    let piedra = document.getElementById("piedra");
    let papel = document.getElementById("papel");
    let tijera = document.getElementById("tijera");

    if (piedra) { piedra.classList.remove("marcada"); }
    if (papel) { papel.classList.remove("marcada"); }
    if (tijera) { tijera.classList.remove("marcada"); }
    //ids_botones:Array<string> = ["piedra", "papel", "tijera"];
    let div_seleccionado = document.getElementById(this.ids_botones[play]);

    if (div_seleccionado) {
      div_seleccionado.classList.add("marcada");
    }


  }


  getComputerPlay() {
    return Math.floor(Math.random() * 3);
  }

  playNow() {

    let computer = this.getComputerPlay();

    let player = localStorage.getItem("selected");

    if (player) {
      let result = this.tabla_decision[+player][computer];

      let img_computer = document.getElementById("computerPlay");

      if (img_computer) {
        img_computer.setAttribute("src", `assets/imagenes/${this.img_botones[computer]}.png`);
        img_computer.setAttribute("alt", this.img_botones[computer]);
      }

      //TODO: mostrar el resultado
      console.log(result);
      this.mostrarResultado(result);

      //localStorage.removeItem("selected");
    }
  }

  mostrarResultado(resultado: number): void {
    console.log("mostrando resultado " +resultado);
    this.marcador_componente.actualizarMarcador(resultado);
  }

}
