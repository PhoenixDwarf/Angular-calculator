import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
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
    // todo:
  });

  it('should calculate result correctly for addition', () => {
    // todo:
  });

  it('should calculate result correctly for subtraction', () => {
    // todo:
  });

  it('should calculate result correctly for multiplication', () => {
    // todo:
  });

  it('should calculate result correctly for division', () => {
    // todo:
  });

  it('should handle decimal point correctly', () => {
    // todo:
  });

  it('should handle decimal point starting with 0', () => {
    // todo:
  });

  it('should handle sign change +/-', () => {
    // todo:
  });

  it('should handle backspace', () => {
    // todo:
  });

  it('should handle backspace with negative numbers', () => {
    // todo:
  });

  it('should handle max length', () => {
    // todo:
  });

  it('should handle invalid input', () => {
    // todo:
  });

  it('should handle negative zero input correctly', () => {
    // todo:
  });
});
