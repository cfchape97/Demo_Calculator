import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CardComponent, InputComponent, ButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthenticationService) {}

  ngOnInit(): void {

      this.signUpForm = this.fb.group({
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(null, [Validators.email]),
        password: new FormControl(),
      });
      }

  onSubmit(): void {
    this.service.signUp(this.signUpForm.value)
  }
}