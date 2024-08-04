import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from './back-button.component';
import { UrlService } from '../../../services/url/url.service';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

class MockUrlService {
  goBack() {
    // Mock implementation to simulate going back
    console.log('Mock goBack() called');
  }
}

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let urlService: UrlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, BackButtonComponent],
      providers: [
        { provide: UrlService, useClass: MockUrlService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    urlService = TestBed.inject(UrlService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateBack method on button click', () => {
    spyOn(component, 'navigateBack');
    const button = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    button.click();
    expect(component.navigateBack).toHaveBeenCalled();
  });

  it('should call UrlService.goBack() when navigateBack method is called', () => {
    spyOn(urlService, 'goBack');
    component.navigateBack();
    expect(urlService.goBack).toHaveBeenCalled();
  });
});
