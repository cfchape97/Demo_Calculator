import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, provideRouter, withRouterConfig } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '../shared/button/button.component';

class MockAuthenticationService {
  checkUserData(value: any) {
    return value.email === 'test@example.com' && value.password === 'password';
  }

  login() { }
}

class MockRouter {
  navigate(path: string[]) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatIconModule,
        RouterTestingModule,
        ButtonComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useClass: MockAuthenticationService },

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const loginForm = component.loginForm;
    expect(loginForm).toBeDefined();
    expect(loginForm.get('email')?.value).toBeNull();
    expect(loginForm.get('password')?.value).toBeNull();
  });

  it('should validate email and password fields', () => {
    const loginForm = component.loginForm;
    const emailControl = loginForm.get('email');
    const passwordControl = loginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();

    emailControl?.setValue('test@example.com');
    passwordControl?.setValue('password');
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should call authenticate method on form submit', () => {
    spyOn(component, 'authenticate');
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.authenticate).toHaveBeenCalled();
  });

  it('should login and navigate to calculator if credentials are correct', () => {
    spyOn(authService, 'checkUserData').and.callThrough();
    spyOn(authService, 'login');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.authenticate();

    expect(authService.checkUserData).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['calculator']);
  });

  it('should not login or navigate if form is invalid', () => {
    spyOn(authService, 'checkUserData').and.callThrough();
    spyOn(authService, 'login');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ email: '', password: '' });
    component.authenticate();

    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
