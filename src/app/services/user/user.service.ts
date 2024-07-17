import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private calculationHistorySubject ;
  calculationHistory$: Observable<string[]> 
  
  constructor() { 
    this.calculationHistorySubject = new BehaviorSubject<string[]>(this.getCalculationHistory());
    this.calculationHistory$ = this.calculationHistorySubject.asObservable();

  }

  addToCalculationHistory(expression: string, result: string): void {
    let calculation = `${expression} = ${result}`;
    let history = this.getCalculationHistory();
    history.push(calculation);
    this.calculationHistorySubject.next(history);
    this.updateCalculationHistory(history);
  }

  private updateCalculationHistory(history: string[]): void {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    this.calculationHistorySubject.next(history);
  }

  getCalculationHistory(): string[] {
    let historyString = localStorage.getItem('calculationHistory');
    return historyString ? JSON.parse(historyString) : [];
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') ?? '');
  }

}
