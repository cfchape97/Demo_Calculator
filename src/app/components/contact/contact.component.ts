import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutComponent } from "../shared/layout/layout.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [InputComponent, CardComponent, ButtonComponent, ReactiveFormsModule, LayoutComponent, MatSnackBarModule]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    this.snackBar.open('Form Submitted Successfully', undefined, {
      duration: 3000
    });
    this.contactForm.reset();
  }
}
