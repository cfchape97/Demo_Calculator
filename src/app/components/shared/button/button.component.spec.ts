import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { Router } from '@angular/router';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let mockRouter: { navigate: jasmine.Spy };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to route if length > 0', () => {
    component.route = 'test';
    component.onClick();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should not navigate to route if length == 0', () => {
    component.route = '';
    component.onClick();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });
});
