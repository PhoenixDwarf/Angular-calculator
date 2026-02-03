import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButton } from './calculator-button';

describe('CalculatorButton', () => {
  let component: CalculatorButton;
  let fixture: ComponentFixture<CalculatorButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButton],
    });

    fixture = TestBed.createComponent(CalculatorButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML);
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    const hostCss = hostElement.classList.value;

    console.log(hostCss);

    expect(hostCss).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('doubleSize', true);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const hostCssClasses = hostElement.classList.value;

    console.log(hostCssClasses);

    expect(hostCssClasses).toContain('w-2/4');
  });

  it('should apply bg-indigo-700/10 class when command is true', () => {
    fixture.componentRef.setInput('command', true);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const buttonCssClasses = hostElement.querySelector('button')?.classList.value;

    console.log(buttonCssClasses);

    expect(buttonCssClasses).toContain('bg-indigo-700/10');
  });

  it('should emit onClick when handleClick is called', () => {
    // todo:
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', (done) => {
    // todo:
  });

  it('should NOT set isPressed if key does not match', () => {
    // todo:
  });

  it('should display projected content', () => {
    // todo:
  });
});
