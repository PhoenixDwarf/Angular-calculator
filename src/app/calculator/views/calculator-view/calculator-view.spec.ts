import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorView from './calculator-view';
import { Component } from '@angular/core';

// Mocked components
@Component({
  selector: 'calculator',
  template: `<div>MockCalculator</div>`,
})
class MockCalculator {}

// Tests
describe('CalculatorView', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorView],
    }).overrideComponent(CalculatorView, {
      set: {
        imports: [MockCalculator],
      },
    });
    // With the code above we overrided the imports from CalculatorView with a mocked component.
    // We wanted to test if the Calculator component was being rendered and we did not care about its inner contents.
    // If for some reason the Calculator component is removed from the CalculatorView component the test will fail.

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Very important !!! If the component receives values through input it makes sure they come
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calculator component', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Since we overrided the calculator component, this log will show the mocked implementation instead of
    // the real component to make the test lighter and to avoid importing unwanted and unnecessary services, components and configs
    console.log(compiled.innerHTML);

    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contain specific tailwind classes in the parent wrapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const expectedClasses =
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' ',
      );

    expectedClasses.forEach((className) => {
      expect(divElement?.classList).toContain(className);
    });
  });
});
