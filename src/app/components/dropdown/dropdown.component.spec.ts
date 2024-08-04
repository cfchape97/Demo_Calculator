import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

class MockAuthenticationService {
  signOut() { }
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatIconModule, RouterModule, DropdownComponent],
      providers: [
        Renderer2,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown open and close', () => {
    expect(component.isOpen).toBeFalse();
    component.toggleDropdown();
    expect(component.isOpen).toBeTrue();
    component.toggleDropdown();
    expect(component.isOpen).toBeFalse();
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen = true;
    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.isOpen).toBeFalse();
  });

  it('should call adjustDropdownPosition on toggle', (done) => {
    spyOn(component, 'adjustDropdownPosition');
    component.toggleDropdown();
    setTimeout(() => {
      expect(component.adjustDropdownPosition).toHaveBeenCalled();
      done();
    }, 0);
  });
});
