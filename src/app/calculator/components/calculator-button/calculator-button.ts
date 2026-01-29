import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [NgClass],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  // New way of doing host bindings, no need for decorator and additional code!
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'doubleSize()',
  },
})
export class CalculatorButton {
  // booleanAttribute
  // Transforms a value (typically a string) to a boolean. Intended to be used as a transform function of an input.
  public command = input(false, { transform: booleanAttribute });
  public firstRow = input(false, { transform: booleanAttribute });
  public division = input(false, { transform: booleanAttribute });
  public doubleSize = input(false, { transform: booleanAttribute });
}
