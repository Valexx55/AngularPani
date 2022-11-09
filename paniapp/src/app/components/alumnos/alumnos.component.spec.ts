import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlumnosComponent } from './alumnos.component';


describe('AlumnosComponent', () => {
  let component: AlumnosComponent;
  let fixture: ComponentFixture<AlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports:[HttpClientTestingModule, RouterTestingModule],
      declarations: [ AlumnosComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('se debe crear', () => {
    expect(component).toBeTruthy();//el componente no es nulo
  });

  it('dice hola', () => {
    expect(component.helloWorld())
        .toEqual("HOla mundo");//comprobando el resultado de una función
  });

  /*
  it('titulo componente', () => {
    fixture.detectChanges();//https://stackoverflow.com/questions/62180812/why-fixture-detectchanges-is-required-for-a-unit-test-jasmine-karma
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.querySelector('.card-header')?.innerHTML);
    expect(compiled.querySelector('.card-header')?.innerHTML).toEqual(component.titulo);//comprobando una etiqueta HTML
  });*/

  it('boton crear', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.innerHTML).toEqual('CREAR');//compruebo el valor de un boton
  });
});

