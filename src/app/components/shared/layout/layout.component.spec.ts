import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({ selector: 'app-navbar', template: '' })
class MockNavbarComponent {}

@Component({ selector: 'app-back-button', template: '' })
class MockBackButtonComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, LayoutComponent],
      declarations: [MockNavbarComponent, MockBackButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar component', () => {
    const navbarElement = fixture.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should render back button component', () => {
    const backButtonElement = fixture.nativeElement.querySelector('app-back-button');
    expect(backButtonElement).toBeTruthy();
  });
});
