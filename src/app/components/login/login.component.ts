import { Component, input } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
