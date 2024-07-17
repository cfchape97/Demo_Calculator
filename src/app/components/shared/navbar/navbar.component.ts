import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { DropdownComponent } from "../../dropdown/dropdown.component";
import { DateService } from '../../../services/date/date.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterModule, MatIconModule, CommonModule, DropdownComponent]
})
export class NavbarComponent implements OnInit {
  dropdownOptions = [{name: 'Profile', route: '/user'}, {name: 'Sign Out', route: '/login'}];
  isLoggedIn: boolean = true;
  
  constructor(private authService: AuthenticationService, private dateService: DateService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.dateService.sessionValid();
  }

  signOut() {
    this.authService.signOut();
  }
}
