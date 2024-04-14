import { TestBed } from '@angular/core/testing';

import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should evaluate mathetmatical expression', () => {
    let expression = '2*2';
    let result = service.evaluateExpression(expression);
    expect(`${result}`).toEqual('4');
  })

  it('should return "Invalid expression" if expression cannot be evaluated', () => {
    let expression = '2*/2';
    let result = service.evaluateExpression(expression);
    expect(result).toEqual('Invalid expression');
  })
});
