import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../shared/layout/layout.component";
import { CardComponent } from "../shared/card/card.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../shared/button/button.component";

@Component({
    selector: 'app-userprofile',
    standalone: true,
    templateUrl: './userprofile.component.html',
    styleUrl: './userprofile.component.scss',
    imports: [LayoutComponent, CardComponent, CommonModule, FormsModule, ButtonComponent]
})
export class UserprofileComponent implements OnInit {
    user: any = {
        firstName: '',
        lastName: '',
        email: ''
    };

    editMode = false;

    calculationHistory$!: Observable<string[]>;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.calculationHistory$ = this.userService.calculationHistory$;
        this.user = this.userService.getUser();
    }

    saveUserInfo(): void {
        localStorage.setItem('user', JSON.stringify(this.user));
        this.editMode = false;
      }
}
