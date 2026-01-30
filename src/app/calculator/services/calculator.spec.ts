import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator';
import { vi } from 'vitest';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    // On line 174 we mocked the log method from the console object.
    // To avoid passing the mocked method down to other tests
    // we reset all mocks, similar to what we do with the service
    // by re injecting it and creating a new instance before each test
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('0456');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

    // The following line will not affect other tests since
    // we are using "beforeEach" to re-inject the calculator service
    // before each test
    service.constructNumber('1');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');

    expect(service.resultText()).toBe('123');
  });

  it('should handle operators correctly', () => {
    service.resultText.set('12345');

    service.constructNumber('-');

    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('-');

    service.resultText.set('12');
    service.constructNumber('x');

    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('x');
  });

  it('should handle operators correctly (forEach)', () => {
    const operators = ['+', '-', 'x', '÷'];

    operators.forEach((operator) => {
      service.resultText.set('1234');

      service.constructNumber(operator);

      expect(service.resultText()).toBe('0');
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('1');
    service.constructNumber('x');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('÷');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('0.5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('12.5');
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('.');
    service.constructNumber('.');

    expect(service.resultText()).toBe('0.');
  });

  it('should handle sign change +/-', () => {
    service.constructNumber('5');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-5');

    service.constructNumber('+/-');

    expect(service.resultText()).toBe('5');
  });

  it('should handle backspace', () => {
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('0');

    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('Backspace');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace with negative numbers', () => {
    service.constructNumber('+/-');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('0');

    service.constructNumber('+/-');
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('-12');
  });

  it('should handle max length', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});

    for (let i = 1; i <= 20; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);
    expect(service.resultText()).toBe('1111111111');

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(10);
  });

  it('should handle invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    service.resultText.set('123');

    service.constructNumber('H');
    service.constructNumber('?');
    service.constructNumber('}');

    expect(service.resultText()).toBe('123');
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'H');
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', '?');
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', '}');
  });
});
