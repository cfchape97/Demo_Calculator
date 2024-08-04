import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { LoginUser, SignUpUser } from './authentication.model';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store login time in localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.login();
    expect(localStorage.setItem).toHaveBeenCalledWith('login', jasmine.any(String));
  });

  it('should check user data and return true for correct credentials', () => {
    const user: SignUpUser = { email: 'test@example.com', password: 'password123', firstName: 'John', lastName: 'Doe' };
    localStorage.setItem('user', JSON.stringify(user));

    const loginUser: LoginUser = { email: 'test@example.com', password: 'password123' };
    const result = service.checkUserData(loginUser);

    expect(result).toBeTrue();
  });

  it('should check user data and return false for incorrect credentials', () => {
    const user: SignUpUser = { email: 'test@example.com', password: 'password123', firstName: 'John', lastName: 'Doe' };
    localStorage.setItem('user', JSON.stringify(user));

    const loginUser: LoginUser = { email: 'test@example.com', password: 'wrongpassword' };
    const result = service.checkUserData(loginUser);

    expect(result).toBeFalse();
  });

  it('should store sign-up user data in localStorage', () => {
    spyOn(localStorage, 'setItem');
    const user: SignUpUser = { email: 'test@example.com', password: 'password123', firstName: 'John', lastName: 'Doe' };
    service.signUp(user);

    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
  });

  it('should return the last login time', () => {
    const date = new Date();
    localStorage.setItem('login', JSON.stringify({ date: date.toJSON() }));

    const lastLoginTime = service.lastLoginTime;
    expect(lastLoginTime.getTime()).toBe(date.getTime());
  });

  it('should remove login data from localStorage on sign out', () => {
    spyOn(localStorage, 'removeItem');
    service.signOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('login');
  });
});
