import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputComponent, CardComponent, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
