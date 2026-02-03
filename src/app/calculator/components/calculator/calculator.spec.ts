import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { signal } from '@angular/core';
import { CalculatorService } from '@/calculator/services/calculator';

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
    // todo:
  });

  it('should handle keyboard events correctly', () => {
    // todo:
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    // todo:
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    // todo:
  });

  it('should call keyboardPressedStyle on all buttons when key is pressed', () => {
    // todo:
  });

  it('should update resultText signal when service updates', () => {
    // todo:
  });

  it('should have 19 calculator-button components with content projected', () => {
    // todo:
  });
});
