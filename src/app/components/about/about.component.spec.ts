import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { CardComponent } from '../shared/card/card.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
        LayoutComponent,
        CardComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the layout component', () => {
    const layoutElement = fixture.debugElement.query(By.directive(LayoutComponent));
    expect(layoutElement).toBeTruthy();
  });

  it('should render the card component', () => {
    const cardElement = fixture.debugElement.query(By.directive(CardComponent));
    expect(cardElement).toBeTruthy();
  });
});
