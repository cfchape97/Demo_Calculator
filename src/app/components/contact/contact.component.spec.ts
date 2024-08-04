import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: MatSnackBar, useValue: snackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.contactForm.controls['firstName'].setValue('John');
    component.contactForm.controls['lastName'].setValue('Doe');
    component.contactForm.controls['email'].setValue('john.doe@example.com');
    component.contactForm.controls['message'].setValue('Hello World');
    expect(component.contactForm.valid).toBeTrue();
  });

  it('should have an invalid form when a required field is empty', () => {
    component.contactForm.controls['firstName'].setValue('');
    component.contactForm.controls['lastName'].setValue('Doe');
    component.contactForm.controls['email'].setValue('john.doe@example.com');
    component.contactForm.controls['message'].setValue('Hello World');
    expect(component.contactForm.valid).toBeFalse();
  });

  it('should show a snack bar and reset the form on submit', fakeAsync(() => {
    let formResetSpy = spyOn(component.contactForm, 'reset');

    component.contactForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello World'
    });

    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    expect(formResetSpy).toHaveBeenCalled();
    flush();
  }));
});