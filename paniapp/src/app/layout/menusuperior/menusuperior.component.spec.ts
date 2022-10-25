import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusuperiorComponent } from './menusuperior.component';

describe('MenusuperiorComponent', () => {
  let component: MenusuperiorComponent;
  let fixture: ComponentFixture<MenusuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusuperiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
