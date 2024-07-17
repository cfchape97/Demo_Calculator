import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from "../back-button/back-button.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [NavbarComponent, MatIconModule, BackButtonComponent]
})
export class LayoutComponent {

}
