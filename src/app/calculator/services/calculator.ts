import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string) {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    if (value === '=') {
      // TODO
      console.log('Calculate result');
      return;
    }
    // Clear output
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }
    // Backspace handling
    // TODO - Add negative values support
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText.length === 1) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update((text) => text.slice(0, -1));
      return;
    }
    // Apply operators
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }
    // Limit char length
    if (this.resultText().length > 10) {
      console.warn('Max length reached');
      return;
    }
    // Validate decimal dots
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }
    // Initial zero handling
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }
    // Symbol handling
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }
      this.resultText.update((text) => '-' + text);
      return;
    }

    // Output

    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }
      this.resultText.update((text) => text + value);
    }
  }
}
