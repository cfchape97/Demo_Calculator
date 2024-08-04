import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserprofileComponent } from './userprofile.component';
import { UserService } from '../../services/user/user.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockUserService {
  calculationHistory$: Observable<string[]> = of(['Calculation 1', 'Calculation 2']);
  
  getUser() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
  }
}

describe('UserprofileComponent', () => {
  let component: UserprofileComponent;
  let fixture: ComponentFixture<UserprofileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserprofileComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserprofileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user profile data', () => {
    expect(component.user).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
  });

  it('should initialize calculation history', () => {
    component.ngOnInit();
    expect(component.calculationHistory$).toBeTruthy();
    component.calculationHistory$.subscribe(history => {
      expect(history).toEqual(['Calculation 1', 'Calculation 2']);
    });
  });

  it('should toggle edit mode', () => {
    expect(component.editMode).toBeFalse();
    component.editMode = true;
    expect(component.editMode).toBeTrue();
  });

  it('should save user info', () => {
    spyOn(localStorage, 'setItem');
    component.user.firstName = 'Jane';
    component.saveUserInfo();
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(component.user));
    expect(component.editMode).toBeFalse();
  });
});
