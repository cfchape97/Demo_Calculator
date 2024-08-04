import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Clear local storage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    service = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('should initialize with calculation history from local storage', () => {
    // Set initial calculation history in local storage
    const initialHistory = ['2+2 = 4'];
    localStorage.setItem('calculationHistory', JSON.stringify(initialHistory));

    // Re-initialize the service to read from local storage
    service = new UserService();

    service.calculationHistory$.subscribe(history => {
      expect(history.length).toBe(1);
      expect(history[0]).toBe('2+2 = 4');
    });
  });

  it('should add to calculation history', () => {
    service = TestBed.inject(UserService);

    service.addToCalculationHistory('3+3', '6');

    service.calculationHistory$.subscribe(history => {
      expect(history.length).toBe(1);
      expect(history[0]).toBe('3+3 = 6');
    });
  });

  it('should update local storage when adding to calculation history', () => {
    service = TestBed.inject(UserService);

    service.addToCalculationHistory('4+4', '8');

    const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')!);
    expect(storedHistory.length).toBe(1);
    expect(storedHistory[0]).toBe('4+4 = 8');
  });
});
