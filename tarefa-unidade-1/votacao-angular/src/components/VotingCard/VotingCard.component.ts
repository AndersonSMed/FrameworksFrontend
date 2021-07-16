import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { VoteInterface } from "../sharedInterfaces";

@Component({
  selector: 'voting-card',
  template: `<div class="voting-card">
    <ng-template [ngIf]="state === 'open'">
      <h3 class="voting-card__title">{{title}}</h3>
      <div class="voting-card__cabinet">
        <vote-list [options]="votingOptions" (onVote)="onSelectVote($event)"></vote-list>
      </div>
    </ng-template>
    <ng-template [ngIf]="state === 'closed'">
      <result [votes]="currentVotes"></result>
    </ng-template>
  </div>`,
  styleUrls: ['./VotingCard.scss'],
})
export default class VotingCardComponent implements OnChanges {
  @Input()
  state: String = 'open';

  @Input()
  title: String = '';

  @Input()
  votes: Array<VoteInterface> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.votes) {
      this.currentVotes = changes.votes.currentValue;
    }
  };

  public get votingOptions(): Array<String> {
    return this.votes.map(item => item.option);
  }

  public currentVotes: Array<VoteInterface> = [];

  public onSelectVote(selectedVote: String): void {
    this.currentVotes = this.currentVotes.map(
      (item) => (
        item.option === selectedVote
          ? { ...item, count: item.count + 1 }
          : item
      )
    )
  }
}