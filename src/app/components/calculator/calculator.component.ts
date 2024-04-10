import { Component } from '@angular/core';
import { CalcButtonComponent } from '../shared/calc-button/calc-button.component';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalcButtonComponent, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  buttons: string[][] = [];

  constructor() {
    this.populateButtons();
  }

  populateButtons() {
    this.buttons = [['1','2','3','+','('], ['4','5','6','-',')'], ['7','8','9','*','.']];
  }

}
