import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  private map!:any;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap():void{
    this.map = L.map('map', {
      center: [ 40.4355687, -3.691947 ],
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  encuentrame()
  {
    console.log("encuentrame()");

    if (navigator.geolocation)//si existe la API
    {
      console.log("tenemos acceso al API de Geolocation");
      navigator.geolocation.getCurrentPosition( (pos)=>{this.exito(pos), ()=>this.fracaso()}, )
    }else {
      console.log("NO tenemos acceso al API de Geolocation");
      this.fracaso();
    }
  }

  fracaso ()
  {
    alert("No es posible determinar su ubicación en este dispositivo");
  }

  exito (posicion:GeolocationPosition)
  {
    console.log("Se ha encontrado su posición");
    console.log("Latitud " + posicion.coords.latitude);
    console.log("Longitud "+ posicion.coords.longitude);
    this.dibujarPosicion(posicion.coords.latitude, posicion.coords.longitude);

  }

  dibujarPosicion (latitude:number, longitude:number)
  {
    //USO EL API DE LEAFLET //https://leafletjs.com/examples/quick-start/
    let nivel_de_zoom = 12;


    this.map.setView([latitude, longitude], nivel_de_zoom);//
    //coordenadas del Estadio del Madrid 40.4530387,-3.6883337
    var circle = L.circle([latitude, longitude], {
      color: 'blue',
      fillColor: '#000',
      fillOpacity: 0.5,
      radius: 50
  }).addTo(this.map);
  }

}
