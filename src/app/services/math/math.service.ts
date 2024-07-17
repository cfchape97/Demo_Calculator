import { Injectable } from '@angular/core';
import * as math from 'mathjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor(private userService: UserService) { }

  evaluateExpression(expression: string): string {
    try {
      let result = math.evaluate(expression);
      this.userService.addToCalculationHistory(expression, result.toString());
      return result.toString();
    } catch (error) {
      return 'Invalid expression';
    }
  }
}
