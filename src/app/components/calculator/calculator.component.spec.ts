import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate buttons', () => {
    component.populateButtons();
    expect(component.buttons).toEqual([['1','2','3','+','('], ['4','5','6','-',')'], ['7','8','9','*','.']]);
  });

  it('should add value to expression', () => {
    let event = '1';
    component.addValue(event);
    expect(component.expression).toEqual('1');
  });

  it('should concatenate value to previous expression', () => {
    component.expression = '1';
    let event = '+';
    component.addValue(event);
    expect(component.expression).toEqual('1+');
  });

  it('should evaluate the epxression', () => {
    component.expression = '2*2';
    component.evaluate();
    expect(`${component.expression}`).toEqual('4');
  })

  it('should clear the value of the expression', () => {
    component.expression = '2*2';
    component.clear();
    expect(component.expression).toEqual('');
  })
});
