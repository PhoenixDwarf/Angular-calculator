import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;

    const routerOutlet = compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet parent div with must-have css classes', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;

    const divElement = compiled.querySelector('div');

    expect(divElement).toBeTruthy();

    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' ',
      );

    const hasAllClasses = mustHaveClasses.every((cls) => divElement?.classList.contains(cls));

    expect(hasAllClasses).toBe(true);
  });
});
