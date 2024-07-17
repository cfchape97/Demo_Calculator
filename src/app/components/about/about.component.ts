import { Component } from '@angular/core';
import { LayoutComponent } from "../shared/layout/layout.component";
import { CardComponent } from "../shared/card/card.component";

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: [LayoutComponent, CardComponent]
})
export class AboutComponent {

}
