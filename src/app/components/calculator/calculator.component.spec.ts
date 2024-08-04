import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalcButtonComponent } from '../shared/calc-button/calc-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MathService } from '../../services/math/math.service';
import { LayoutComponent } from '../shared/layout/layout.component';
import { By } from '@angular/platform-browser';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mathService: MathService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalculatorComponent,
        CommonModule,
        FormsModule,
        CalcButtonComponent,
        LayoutComponent
      ],
      providers: [MathService]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    mathService = TestBed.inject(MathService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate buttons', () => {
    component.populateButtons();
    expect(component.buttons.length).toBe(3);
    expect(component.buttons[0].length).toBe(5);
  });

  it('should add value to expression', () => {
    component.addValue('1');
    expect(component.expression).toBe('1');
    component.addValue('+');
    expect(component.expression).toBe('1+');
  });

  it('should clear the expression', () => {
    component.addValue('1');
    component.clear();
    expect(component.expression).toBe('');
  });

  it('should evaluate the expression', () => {
    spyOn(mathService, 'evaluateExpression').and.returnValue('3');
    component.addValue('1+2');
    component.evaluate();
    expect(mathService.evaluateExpression).toHaveBeenCalledWith('1+2');
    expect(component.expression).toBe('3');
  });

  it('should restrict characters', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'a'
    });
    spyOn(event, 'preventDefault');
    component.RestrictCharacters(event);
    expect(event.preventDefault).toHaveBeenCalled();

    const validEvent = new KeyboardEvent('keydown', {
      key: '1'
    });
    spyOn(validEvent, 'preventDefault');
    component.RestrictCharacters(validEvent);
    expect(validEvent.preventDefault).not.toHaveBeenCalled();
  });
});
