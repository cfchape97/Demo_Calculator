import { Injectable } from '@angular/core';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  evaluateExpression(expression: string): string {
    try {
      const result = math.evaluate(expression);
      return result.toString();
    } catch (error) {
      return 'Invalid expression';
    }
  }
}
