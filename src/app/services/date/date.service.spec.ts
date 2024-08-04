import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../authentication/authentication.service';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['dummyMethod']);

    TestBed.configureTestingModule({
      providers: [
        DateService,
        { provide: AuthenticationService, useValue: mockAuthService }
      ]
    });

    service = TestBed.inject(DateService);
  });

  it('should return true when the session is still valid', () => {
    const currentTime = new Date();
    Object.defineProperty(mockAuthService, 'lastLoginTime', {
      get: () => new Date(currentTime.getTime() - 23 * 60 * 60 * 1000) // 23 hours ago
    });

    expect(service.sessionValid()).toBeTrue();
  });

  it('should return false and remove the login item when the session is invalid', () => {
    const currentTime = new Date();
    Object.defineProperty(mockAuthService, 'lastLoginTime', {
      get: () => new Date(currentTime.getTime() - 25 * 60 * 60 * 1000) // 25 hours ago
    });

    spyOn(localStorage, 'removeItem');

    expect(service.sessionValid()).toBeFalse();
    expect(localStorage.removeItem).toHaveBeenCalledWith('login');
  });

  it('should return false when an error occurs', () => {
    Object.defineProperty(mockAuthService, 'lastLoginTime', {
      get: () => { throw new Error('Invalid date'); }
    });

    expect(service.sessionValid()).toBeFalse();
  });
});
