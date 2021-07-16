import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vote-list',
  template: `<div [ngClass]="classes">
    <ul class="vote-list__list">
      <li *ngFor="let option of options" class="vote-list__list-item">
        <simple-button
          (onClick)="onSelectVote(option)"
          [selected]="selectedVote === option"
          [disabled]="disabled"
          [text]="option"
        ></simple-button> 
      </li>
    </ul>
  </div>`,
  styleUrls: ['./VoteList.scss'],
})
export default class VoteListComponent {
  @Input()
  display: String = 'horizontal';

  @Input()
  disabled: Boolean = false;

  @Input()
  options: Array<String> = [];

  @Output()
  onVote = new EventEmitter<String>();

  public selectedVote: String = "";

  public onSelectVote(selectedOption: String): void {
    this.selectedVote = selectedOption;
    this.onVote.emit(selectedOption);
  }

  public get classes(): Object {
    return {
      'vote-list': true,
      'vote-list--horizontal': this.display === 'horizontal',
      'vote-list--vertical': this.display === 'vertical'
    }
  }
}
