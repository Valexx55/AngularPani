import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoPptComponent } from './juego-ppt.component';

describe('JuegoPptComponent', () => {
  let component: JuegoPptComponent;
  let fixture: ComponentFixture<JuegoPptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoPptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoPptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
