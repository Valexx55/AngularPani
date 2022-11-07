//Para crear nuestro propio element usamos la herencia y 
//creamos un clase que Hereda de HTMLElement
export class BuscaCancionesItunes extends HTMLElement {
    
    //creamos los nodos hijos, que colgarán del elemento raíz personalizado
    constructor() {
        super();
        //esto se denonina DOM sombra. y es un pequeño árbol independiente
        let shadow = this.attachShadow({ mode: 'open' }); //con esta opción permitimos que el JS externo manipule este subarbol
        let plantilla = BuscaCancionesItunes.template;//la plantilla. El HTML puro y duro. Ver el método get template
        let clone = document.importNode(plantilla.content, true);//conectamos el nuevo trozo html con el documento original
        shadow.appendChild(clone);//añadimos el contenido

    }


    //Detalle importante ver cómo programamos el callback con el host
    static get template() {
        let template = document.createElement('template');
        template.innerHTML = `
        <input type="search" placeholder="Introduzca tema o artista a buscar"></input>
        <button onclick="this.getRootNode().host.buscar()">BUSCAR</button>`;
        return template;
    }

    //este método se invoca al representar el elemento personalizado
    //se podría aprovechar para hacer cosillas.
    connectedCallback() {
        console.log("redenrizando");
    }

    mostrarCancion (cancion)
    {
        console.log (cancion.artistName);
        let artista = document.createElement ("h3");//creamos el elemento nuevo
        artista.innerHTML = cancion.artistName;//obtenemos el nombre del artista. en realidad podríamos mostrar toda la info que quisierámos (ver un ejemplo al pie de lo que devuelve Itunes )
        document.querySelector('lista-canciones-itunes').shadowRoot.appendChild(artista);//lo añadimos y así se verá

    }
   
    mostrarResultados (resultados)
    {
        let cancion = null;

        for (cancion of resultados)//recorremos el array de resultados
        {
            this.mostrarCancion (cancion);//para cada título, mostramos
        }
    }

    //al tocar el botón se llama a este método, que invoca al api web de Itunes
    buscar ()
    {
        console.log("buscaar");
        
        this.busqueda = this.shadowRoot.children[0].value;
        console.log ("A buscar " +  this.shadowRoot.children[0].value);//obtenemos la cadena de búsqueda

        fetch('https://itunes.apple.com/search/?media=music&term='+this.busqueda)//hacemos la llamada. La parte fija de la URL debería ser una constante
                .then(function(response) {
                return response.json();})//pasamos a JSON el cuerpo de la respuesta 
                .then( (json_busqueda)  => {
                console.log(json_busqueda);
                this.mostrarResultados (json_busqueda.results);//mostramos los resultados
                });
        
    }

}
/**
 * lo que devuelve itunes por cada canción es 
 * 
 * artistId: 152016
artistName: "Paul Simon"
artistViewUrl: "https://music.apple.com/us/artist/paul-simon/152016?uo=4"
artworkUrl100: "https://is5-ssl.mzstatic.com/image/thumb/Music1/v4/0a/db/3b/0adb3bf6-9cca-0068-ef7f-ce5ff78f269c/source/100x100bb.jpg"
artworkUrl30: "https://is5-ssl.mzstatic.com/image/thumb/Music1/v4/0a/db/3b/0adb3bf6-9cca-0068-ef7f-ce5ff78f269c/source/30x30bb.jpg"
artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Music1/v4/0a/db/3b/0adb3bf6-9cca-0068-ef7f-ce5ff78f269c/source/60x60bb.jpg"
collectionCensoredName: "Paul Simon"
collectionExplicitness: "notExplicit"
collectionId: 380588824
collectionName: "Paul Simon"
collectionPrice: 9.99
collectionViewUrl: "https://music.apple.com/us/album/me-and-julio-down-by-the-schoolyard/380588824?i=380588841&uo=4"
country: "USA"
currency: "USD"
discCount: 1
discNumber: 1
isStreamable: true
kind: "song"
previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/Music1/v4/a3/ad/25/a3ad255e-61a0-ed2d-55b9-d1e6aab1f70c/mzaf_6339610971265634109.plus.aac.p.m4a"
primaryGenreName: "Pop"
releaseDate: "1972-01-24T08:00:00Z"
trackCensoredName: "Me and Julio Down By the Schoolyard"
trackCount: 14
trackExplicitness: "notExplicit"
trackId: 380588841
trackName: "Me and Julio Down By the Schoolyard"
trackNumber: 6
trackPrice: 1.29
trackTimeMillis: 164813
trackViewUrl: "https://music.apple.com/us/album/me-and-julio-down-by-the-schoolyard/380588824?i=380588841&uo=4"
wrapperType: "track"
 */