import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DateService } from '../date/date.service';
import { canActivateLogin, canActivateCalculator } from './routeguard.service';

describe('AuthGuards', () => {
  let mockDateService: jasmine.SpyObj<DateService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockDateService = jasmine.createSpyObj('DateService', ['sessionValid']);
    mockRouter = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DateService, useValue: mockDateService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  describe('canActivateLogin', () => {
    it('should return true when session is valid', () => {
      mockDateService.sessionValid.and.returnValue(true);

      const result = TestBed.runInInjectionContext(() => canActivateLogin({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

      expect(result).toBeTrue();
    });

    it('should return a UrlTree redirecting to /login when session is invalid', () => {
      mockDateService.sessionValid.and.returnValue(false);
      const urlTree = { url: '/login' } as unknown as UrlTree;
      mockRouter.createUrlTree.and.returnValue(urlTree);

      const result = TestBed.runInInjectionContext(() => canActivateLogin({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

      expect(result).toBe(urlTree);
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('canActivateCalculator', () => {
    it('should return true when session is invalid', () => {
      mockDateService.sessionValid.and.returnValue(false);

      const result = TestBed.runInInjectionContext(() => canActivateCalculator({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

      expect(result).toBeTrue();
    });

    it('should return a UrlTree redirecting to /calculator when session is valid', () => {
      mockDateService.sessionValid.and.returnValue(true);
      const urlTree = { url: '/calculator' } as unknown as UrlTree;
      mockRouter.createUrlTree.and.returnValue(urlTree);

      const result = TestBed.runInInjectionContext(() => canActivateCalculator({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

      expect(result).toBe(urlTree);
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/calculator']);
    });
  });
});
