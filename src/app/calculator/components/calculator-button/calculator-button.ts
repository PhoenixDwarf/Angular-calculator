import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [NgClass],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  // New way of doing host bindings, no need for decorator and additional code!
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'doubleSize()',
    '[class.w-1/4]': '!doubleSize()',
  },
})
export class CalculatorButton {
  // booleanAttribute
  // Transforms a value (typically a string) to a boolean. Intended to be used as a transform function of an input.
  public command = input(false, { transform: booleanAttribute });
  public firstRow = input(false, { transform: booleanAttribute });
  public division = input(false, { transform: booleanAttribute });
  public doubleSize = input(false, { transform: booleanAttribute });

  public btnClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public pressed = signal(false);

  handleClick() {
    const btnRef = this.contentValue()?.nativeElement;
    if (!btnRef) return;

    this.btnClick.emit(btnRef.innerText.trim());
  }

  keyboardPressStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()?.nativeElement.innerText;
    if (value !== key) return;

    this.pressed.set(true);
    setTimeout(() => this.pressed.set(false), 100);
  }
}
