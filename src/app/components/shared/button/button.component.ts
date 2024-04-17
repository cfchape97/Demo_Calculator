import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() route: string = '';
  @Input() class: string = '';

  constructor(private router: Router) {

  }

  onClick() {
    if (this.route.length != 0) this.router.navigate([this.route]);
  }
}
