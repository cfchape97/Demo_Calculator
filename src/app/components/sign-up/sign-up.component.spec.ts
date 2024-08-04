import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { provideRouter } from '@angular/router';
import { CardComponent } from '../shared/card/card.component';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';
import { By } from '@angular/platform-browser';

class MockAuthenticationService {
  signUp(data: any) { }
}

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CardComponent,
        InputComponent,
        ButtonComponent,
        SignUpComponent 
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        FormBuilder,
        provideRouter([]) 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const signUpForm = component.signUpForm;
    expect(signUpForm).toBeDefined();
    expect(signUpForm.get('firstName')?.value).toBeNull();
    expect(signUpForm.get('lastName')?.value).toBeNull();
    expect(signUpForm.get('email')?.value).toBeNull();
    expect(signUpForm.get('password')?.value).toBeNull();
  });

  it('should validate email field', () => {
    const emailControl = component.signUpForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should call signUp method on form submit', () => {
    spyOn(authService, 'signUp');

    component.signUpForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password'
    });

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(authService.signUp).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password'
    });
  });

  it('should disable submit button if form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('app-button button');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();

    component.signUpForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password'
    });

    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });
});
