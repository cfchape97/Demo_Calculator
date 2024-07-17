import { Component } from '@angular/core';
import { UrlService } from '../../../services/url/url.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  constructor(private urlService: UrlService) { }

  navigateBack() {
    this.urlService.goBack();
  }
}
