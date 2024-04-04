import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string = '';

  prefixIcon = '';

  ngOnInit() {
    this.prefixIcon = `url(../../../assets/${this.icon}.png) left no-repeat`;
  }
}
