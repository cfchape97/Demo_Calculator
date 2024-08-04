import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { DateService } from '../../../services/date/date.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent } from "../../dropdown/dropdown.component";
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let dateService: jasmine.SpyObj<DateService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['signOut']);
    const dateServiceSpy = jasmine.createSpyObj('DateService', ['sessionValid']);

    await TestBed.configureTestingModule({
      imports: [ NavbarComponent, RouterTestingModule, MatIconModule, CommonModule, DropdownComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: DateService, useValue: dateServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    dateService = TestBed.inject(DateService) as jasmine.SpyObj<DateService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if session is valid', () => {
    dateService.sessionValid.and.returnValue(true);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false if session is not valid', () => {
    dateService.sessionValid.and.returnValue(false);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call signOut method from authService when signOut is called', () => {
    component.signOut();
    expect(authService.signOut).toHaveBeenCalled();
  });
});
