import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class Calculator {
  public calculatorBtns = viewChildren(CalculatorButton);
  private calculatorService = inject(CalculatorService);

  // One way to do it

  // get resultText() {
  //   return this.calculatorService.resultText.asReadonly();
  // }

  // Another way to do it

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: any) {
    console.log({ key });
  }

  // Old way to listen to events, using HostListener the decorator
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '/': '÷',
      X: 'x',
      c: 'C',
      '*': 'x',
      Enter: '=',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorBtns().forEach((button) => button.keyboardPressStyle(keyValue));
  }
}
