import { Component, Input } from '@angular/core';
import { VoteInterface } from '../sharedInterfaces';

function calculatePercentage(target: number, total: number): String {
  return `${((target / total) * 100).toFixed(0)}%`;
}

@Component({
  selector: 'result',
  template: `<div class="result">
    <ol class="result__list">
      <li *ngFor="let vote of votes" class="result__list-item">
        {{getVoteMessage(vote)}}
      </li>
    </ol>
  </div>`,
  styleUrls: ['./Result.scss'],
})
export default class ResultComponent {
  @Input()
  votes: Array<VoteInterface> = [];

  private get totalVotes(): number {
    return this.votes.reduce((acc, { count }) => acc + count, 0);
  }

  private getVotePercentage(votesCount: number): String {
    return calculatePercentage(votesCount, this.totalVotes);
  }

  public getVoteMessage(vote: VoteInterface): String {
    return `${vote.option} - ${vote.count} votes (${this.getVotePercentage(vote.count)})`;
  }
}
