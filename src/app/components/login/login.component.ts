import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateService } from '../../services/date/date.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterModule, CardComponent, CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private service: AuthenticationService, 
    private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl( null, [Validators.required])
    });
  }


  authenticate() {
    if (this.service.checkUserData(this.loginForm.value) && this.loginForm.valid) {
      this.service.login();
      this.router.navigate(['calculator']);
    }
  }
}