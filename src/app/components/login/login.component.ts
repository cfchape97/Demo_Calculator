import { Component, input } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
