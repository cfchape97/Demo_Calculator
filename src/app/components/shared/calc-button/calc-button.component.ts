import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-calc-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calc-button.component.html',
  styleUrl: './calc-button.component.scss'
})
export class CalcButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() width: number = 1;
  @Input() height: number = 1;
  buttonWidth = 60;
  buttonHeight = 60;

  ngOnInit() {
    this.calculateButtonSize();
  }

  private calculateButtonSize() {
    this.buttonWidth = 60 * this.width + 16 * (this.width - 1);
    this.buttonHeight = 60 * this.height + 16 * (this.height - 1);
  }
}
