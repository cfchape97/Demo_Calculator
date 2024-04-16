import { Component } from '@angular/core';
import { CalcButtonComponent } from '../shared/calc-button/calc-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MathService } from '../../services/math/math.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalcButtonComponent, CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  buttons: string[][] = [];
  expression: string = '';

  constructor(private mathService: MathService) {
    this.populateButtons();
  }

  populateButtons() {
    this.buttons = [['1', '2', '3', '+', '('], ['4', '5', '6', '-', ')'], ['7', '8', '9', '*', '.']];
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