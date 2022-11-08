export class Evento {

    id:number;
    titulo:string;
    latitud:string;
    longitud:string;
    url:string;

    constructor(id:number,
        titulo:string,
        latitud:string,
        longitud:string,
        url:string)
        {
            this.id = id;
            this.titulo = titulo;
            this.latitud = latitud;
            this.longitud = longitud;
            this.url = url;

        }

}
