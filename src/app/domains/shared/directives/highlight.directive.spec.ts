import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import {
  SpectatorDirective,
  createDirectiveFactory,
} from '@ngneat/spectator/jest';

@Component({
  template: `<div appHighlight>Test Content</div>`,
  standalone: true,
  imports: [HighlightDirective],
})
class TestComponent {}

describe('HighlightDirective Integration Test', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should set background color to red in host element', () => {
    const divElement = fixture.nativeElement.querySelector('div');
    expect(divElement.style.backgroundColor).toBe('red');
  });
});

describe('HighlightDirective Unit Test', () => {
  let spectator: SpectatorDirective<HighlightDirective>;
  const createDirective = createDirectiveFactory({
    directive: HighlightDirective,
  });

  beforeEach(() => {
    spectator = createDirective(`<div appHighlight>Test</div>`);
  });

  it('should create the directive', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should set background color to red using spectator', () => {
    expect(spectator.element as HTMLElement).toHaveStyle({
      backgroundColor: 'red',
    });
  });
});
