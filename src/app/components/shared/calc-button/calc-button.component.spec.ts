import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcButtonComponent } from './calc-button.component';

describe('CalcButtonComponent', () => {
  let component: CalcButtonComponent;
  let fixture: ComponentFixture<CalcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate button width', () => {
    component.width = 2;
    component.ngOnInit();
    expect(component.buttonWidth).toEqual(136);
  })

  it('should calculate button height', () => {
    component.height =3;
    component.ngOnInit();
    expect(component.buttonHeight).toEqual(212);
  })
});
