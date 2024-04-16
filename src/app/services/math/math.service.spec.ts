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

  it('should evaluate mathetmatical expressions', () => {
    let expressions = ['2*2', '2/2', '2+2', '2-2', '2*(2+2)', '1.5+1.5'];
    let results = [];
    for (let i = 0; i < expressions.length; i++) {
      let result = service.evaluateExpression(expressions[i])
      results.push(result);
    }
    expect(results).toEqual(['4', '1', '4', '0', '8', '3']);
  })

  it('should return "Invalid expression" if expression cannot be evaluated', () => {
    let expression = '2*/2';
    let result = service.evaluateExpression(expression);
    expect(result).toEqual('Invalid expression');
  })
});
