export class Alumno {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    edad: number;
    creadoEn: string;
    fotoHashCode: string;

    constructor ()
    {
        this.id=0;
        this.nombre="";
        this.apellido="";
        this.email="";
        this.edad=0;
        this.creadoEn="";
    }

    public toString () : string{
        return (`${this.id} ${this.nombre} ${this.apellido} ${this.email} ${this.edad} ${this.creadoEn}`);
    }
}