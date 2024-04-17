import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

const BASE_WIDTH = 200;
const PADDING = 44;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string = '';
  @Input() width: number = 1;
  buttonWidth = BASE_WIDTH;

  private calculateButtonWidth() {
    this.buttonWidth = BASE_WIDTH * this.width + PADDING * (this.width - 1);

  }

  prefixIcon = '';

  ngOnInit() {
    this.prefixIcon = `url(../../../assets/${this.icon}.png) left no-repeat`;
    this.calculateButtonWidth();
  }
}
