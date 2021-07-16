import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-button',
  template: `<button
      type="button"
      (click)="onClick.emit($event)"
      [disabled]="disabled"
      [ngClass]="classes"
    >
      {{ text }}
    </button>`,
  styleUrls: ['./Button.scss'],
})
export default class ButtonComponent {
  @Input()
  selected: Boolean = false;

  @Input()
  disabled: Boolean = false;

  @Input()
  text: String = '';

  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): Object {
    return {
      'btn': true,
      'btn--selected': (this.selected && !this.disabled)
    };
  }
}
