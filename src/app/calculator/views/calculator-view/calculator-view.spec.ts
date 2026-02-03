import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorView from './calculator-view';

describe('CalculatorView', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorView],
    });

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Very important !!! If the component receives values through input it makes sure they come
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
