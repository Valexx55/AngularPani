import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { MadridService } from 'src/app/services/madrid.service';

@Component({
  selector: 'app-ocio',
  templateUrl: './ocio.component.html',
  styleUrls: ['./ocio.component.css']
})
export class OcioComponent implements OnInit {


  distritos:Array<string>;
  distrito_seleccionado!:string;
  array_eventos!:Array<Evento>;
  numero_eventos:number;

  constructor(private madridService:MadridService) { 
    this.distrito_seleccionado = '';
    this.numero_eventos = 0;
    this.array_eventos = new Array<Evento>();
  }

  ngOnInit(): void {
    this.distritos = ['ARGANZUELA', 'BARAJAS', 'CARABANCHEL', 'CENTRO', 'CHAMARTIN', 'CHAMBERI', 'CIUDAD LINEAL', 'FUENCARRAL-EL PARDO', 'HORTALEZA', 'LATINA', 'MONCLOA-ARAVACA', 'MORATALAZ', 'PUENTE DE VALLECAS', 'RETIRO', 'SALAMANCA', 'SAN BLAS-CANILLEJAS', 'TETUAN', 'USERA', 'VICALVARO', 'VILLA DE VALLECAS', 'VILLAVERDE' ];
  }

  distritoSeleccionado (evento:Event)
  {
    console.log("distrinto seleccionado ");

    let elementoSelect:HTMLSelectElement = <HTMLSelectElement> evento.target;
    elementoSelect.value = elementoSelect.value;
    console.log("distrinto seleccionado " +elementoSelect.value);

    this.madridService.obtenerEventos(elementoSelect.value).subscribe(
      {
        complete: ()=> {console.log("comunicacióm completada");},
        error: (mensaje_error) => {
          console.error(`ERROR ${mensaje_error.status} ${mensaje_error.message}`);
          alert("IMPOSIBLE CONECTAR AL SERVIDOR");
        },
        next: (respuesta) =>
        {
          let cuerpo_respuesta = respuesta.body;
          console.log("respuesta rx " + cuerpo_respuesta);
          //TODO:MOSTRARLO
          let evento_aux: Evento;
          let numero:number = 0;//contador
          this.array_eventos.length=0;//refresco los resultados
          
          cuerpo_respuesta['@graph'].forEach(
            (evento_actual:any) =>{
                numero = numero + 1;
                evento_aux = new Evento(numero, evento_actual.title, evento_actual.location.latitude, evento_actual.location.longitude, evento_actual['@id']); 
                this.array_eventos.push(evento_aux);

            }
          );
          this.numero_eventos = this.array_eventos.length;
        }
      }
    )
    
  }

  verEnElMapa(id_evento:number)
  {
    //TODO: comunicar con el compoennte Mapa la posición
  }

  verEnDetalle(evento:Evento)
  {

    //TODO: comunicar con el Api llamando al get de la URl del evento
  }

}
