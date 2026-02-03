import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { signal } from '@angular/core';
import { CalculatorService } from '@/calculator/services/calculator';
import { By } from '@angular/platform-browser';
import { CalculatorButton } from '../calculator-button/calculator-button';

class MockCalculatorService {
  resultText = signal('100');
  subResultText = signal('50');
  lastOperator = signal('-');
  constructNumber = vi.fn();
}

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;
  let mockCalculatorService: MockCalculatorService = new MockCalculatorService();

  beforeEach(() => {
    mockCalculatorService = new MockCalculatorService();

    TestBed.configureTestingModule({
      imports: [Calculator],
      // Replaces the CalculatorService with a Mock
      providers: [
        {
          provide: CalculatorService,
          // Important! For the "useValue" we should always pass the instance (not the class)
          useValue: mockCalculatorService,
        },
      ],
    });

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values from service', () => {
    console.log({
      resultText: component.resultText(),
      subResultText: component.subResultText(),
      lastOperator: component.lastOperator(),
    });

    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('50');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display values in the template', () => {
    mockCalculatorService.resultText.set('50');
    mockCalculatorService.subResultText.set('10');
    mockCalculatorService.lastOperator.set('+');

    // Important to reflect the changes we just did to the service
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const resultTextElement = compiled.querySelector('[data-test-id="resultText"]');
    // For the next selector I used a tailwind class just for demonstration but data attribute will be better
    const subResultTextElement = compiled.querySelector('.text-4xl');

    expect(resultTextElement?.innerHTML).toBe(mockCalculatorService.resultText());
    expect(subResultTextElement?.innerHTML).toContain('10 +');
  });

  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
  });

  it('should handle keyboard events correctly', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should call constructNumber when button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CalculatorButton));

    buttons.forEach((button) => button.triggerEventHandler('btnClick', 'C'));

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledTimes(buttons.length);
  });

  it('should update resultText signal when service updates', () => {
    mockCalculatorService.resultText.set('999');
    fixture.detectChanges();

    expect(component.resultText()).toBe('999');
  });

  it('should have 19 calculator-button components with content projected', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('calculator-button');
    const buttonsContents = 'C +/- % ÷ 7 8 9 x 4 5 6 - 1 2 3 + 0 . ='.split(' ');

    expect(buttons.length).toBe(19);

    for (let i = 0; i < buttonsContents.length; i++) {
      expect(buttons[i].textContent.trim()).toBe(buttonsContents[i]);
    }
  });
});
