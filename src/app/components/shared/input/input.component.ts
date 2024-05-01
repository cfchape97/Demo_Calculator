import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const BASE_WIDTH = 200;
const PADDING = 44;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string = '';
  @Input() width: number = 1;
  value = '';
  buttonWidth = BASE_WIDTH;
  prefixIcon = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  ngOnInit() {
    this.prefixIcon = `url(../../../assets/${this.icon}.png) left no-repeat`;
    this.calculateButtonWidth();
  }

  private calculateButtonWidth() {
    this.buttonWidth = BASE_WIDTH * this.width + PADDING * (this.width - 1);
  }

  handleInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
