import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Component, DebugElement, forwardRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-input [(ngModel)]="value"></app-input>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestHostComponent),
      multi: true
    }
  ]
})
class TestHostComponent {
  value: string = '';
}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLInputElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InputComponent, FormsModule, MatIconModule ],
      declarations: [TestHostComponent]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    debugElement = fixture.debugElement.query(By.directive(InputComponent));
    inputElement = debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input element', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should update value on input', () => {
    const testValue = 'Test Input';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.value).toEqual(testValue);
  });

  it('should call onChange when input value changes', () => {
    const spy = spyOn(component, 'onChange');
    const testValue = 'Test Input';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(testValue);
  });

  it('should call onTouched when input is touched', () => {
    const spy = spyOn(component, 'onTouched');
    inputElement.dispatchEvent(new Event('focus'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should update value when writeValue is called', () => {
    const testValue = 'Initial Value';
    component.writeValue(testValue);
    fixture.detectChanges();
    expect(component.value).toEqual(testValue);
    expect(inputElement.value).toEqual(testValue);
  });
});
