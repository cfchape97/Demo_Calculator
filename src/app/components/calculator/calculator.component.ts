import { Component } from '@angular/core';
import { CalcButtonComponent } from '../shared/calc-button/calc-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MathService } from '../../services/math/math.service';
import { LayoutComponent } from '../shared/layout/layout.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  imports: [CalcButtonComponent, CommonModule, FormsModule, LayoutComponent]
})
export class CalculatorComponent {
  buttons: { symbol: string, color: string }[][] = [];
  expression: string = '';

  constructor(private mathService: MathService) {
    this.populateButtons();
  }

  populateButtons() {
    this.buttons = [
      [{ symbol: '1', color: '#ffc139' },
      { symbol: '2', color: '#ffc139' },
      { symbol: '3', color: '#ffc139' },
      { symbol: '+', color: '#78e510' },
      { symbol: '(', color: '#78e510' }],

      [{ symbol: '4', color: '#ffc139' },
      { symbol: '5', color: '#ffc139' },
      { symbol: '6', color: '#ffc139' },
      { symbol: '-', color: '#78e510' },
      { symbol: ')', color: '#78e510' }],

      [{ symbol: '7', color: '#ffc139' },
      { symbol: '8', color: '#ffc139' },
      { symbol: '9', color: '#ffc139' },
      { symbol: '*', color: '#664d16' },
      { symbol: '.', color: '#664d16' }]];
  }

  addValue(event: string) {
    this.expression += event;
    console.log(this.expression);
  }

  evaluate() {
    this.expression = this.mathService.evaluateExpression(this.expression);
  }

  clear() {
    this.expression = '';
  }

  RestrictCharacters(event: KeyboardEvent) {
    const allowedCharacters = ['1', '2', '3', '+', '(', '4', '5', '6', '-', ')', '7', '8', '9', '*', '.'];
    const keyPress = event.key;

    if (!allowedCharacters.includes(keyPress)) {
      event.preventDefault();
    }
  }
}