import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { UrlService } from './url.service';
import { BehaviorSubject } from 'rxjs';

describe('UrlService', () => {
  let service: UrlService;
  let router: Router;
  let routerEvents: BehaviorSubject<any>;

  beforeEach(() => {
    routerEvents = new BehaviorSubject<any>(null);

    TestBed.configureTestingModule({
      providers: [
        UrlService,
        {
          provide: Router,
          useValue: {
            events: routerEvents.asObservable(),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    });

    service = TestBed.inject(UrlService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track navigation events and update history', () => {
    routerEvents.next(new NavigationEnd(1, '/first', '/first'));
    routerEvents.next(new NavigationEnd(2, '/second', '/second'));

    expect(service.history).toEqual(['/first', '/second']);
  });

  it('should navigate to the previous URL on goBack', () => {
    routerEvents.next(new NavigationEnd(1, '/first', '/first'));
    routerEvents.next(new NavigationEnd(2, '/second', '/second'));
    routerEvents.next(new NavigationEnd(3, '/third', '/third'));

    service.goBack();

    expect(service.history).toEqual(['/first']);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/second');
  });

  it('should not navigate if history has only one entry', () => {
    routerEvents.next(new NavigationEnd(1, '/first', '/first'));

    service.goBack();

    expect(service.history).toEqual(['/first']);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
