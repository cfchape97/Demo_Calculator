import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutComponent } from "../shared/layout/layout.component";
@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [InputComponent, CardComponent, ButtonComponent, ReactiveFormsModule, LayoutComponent]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(null, [Validators.email]),
      message: new FormControl(),
    });
  }

  onSubmit(): void {
    console.log('Form Data:', this.contactForm.value);
  }
}
