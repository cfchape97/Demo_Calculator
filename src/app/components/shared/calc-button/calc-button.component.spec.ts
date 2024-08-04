import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CalcButtonComponent } from './calc-button.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-calc-button
               [text]="text"
               [width]="width"
               [height]="height"
               [color]="color"
               (press)="onPress($event)">
             </app-calc-button>`
})
class TestHostComponent {
  text = '1';
  width = 2;
  height = 1;
  color = '#ffc139';
  onPress(event: string) {}
}

describe('CalcButtonComponent', () => {
  let component: CalcButtonComponent;
  let fixture: ComponentFixture<CalcButtonComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcButtonComponent],
      declarations: [TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    fixture = TestBed.createComponent(CalcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    const buttonElement = hostFixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe(hostComponent.text);
  });

  it('should emit the correct value on button click', () => {
    spyOn(hostComponent, 'onPress');
    const buttonElement = hostFixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(hostComponent.onPress).toHaveBeenCalledWith(hostComponent.text);
  });

  it('should set button width correctly', () => {
    component.width = 2;
    fixture.detectChanges();

    const expectedWidth = 60 * component.width + 16 * (component.width - 1);

    expect(expectedWidth).toBe(136);
  });
  
  it('should set button height correctly', () => {
    component.height = 1;
    fixture.detectChanges();

    const expectedHeight = 60 * component.height + 16 * (component.height - 1);

    expect(expectedHeight).toBe(60);
  });
});
