import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputComponent, CardComponent, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      firstName: new FormControl(), 
      lastName: new FormControl(), 
      email: new FormControl(), 
      message: new FormControl(), 
    });
  }
  
}
