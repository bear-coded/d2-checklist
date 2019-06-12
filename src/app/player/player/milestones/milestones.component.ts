import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ChildComponent } from '@app/shared/child.component';
import { StorageService } from '@app/service/storage.service';
import { Player, MileStoneName } from '@app/service/model';
import { BungieService } from '@app/service/bungie.service';
import { PlayerStateService } from '../player-state.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'd2c-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MilestonesComponent extends ChildComponent implements OnInit {
  hideCompleteChars: string = null;

  constructor(
    storageService: StorageService,
    public state: PlayerStateService,
    private ref: ChangeDetectorRef) {
    super(storageService, ref);
  }

  ngOnInit() {
    this.state.player.pipe(takeUntil(this.unsubscribe$)).subscribe((p: Player) => {
      console.log('new player');
    });
  }

  public showAllMilestones(): void {
    this.storageService.showAllMilestones();
    this.hideCompleteChars = null;
  }

  public hideMilestone(ms: string): void {
    this.storageService.hideMilestone(ms);
  }

  public toggleHide(hideMe: string) {
    if (this.hideCompleteChars === hideMe) {
      this.hideCompleteChars = null;
    } else {
      this.hideCompleteChars = hideMe;
    }
  }

  public hideRow(mileStoneName: MileStoneName): boolean {
    if (this.hideCompleteChars == null) { return false; }
    let allDone = true;
    for (const char of this.state.currPlayer().characters) {
      let doneChar = false;
      if (char.milestones[mileStoneName.key] != null) {
        if (char.milestones[mileStoneName.key].complete === true) {
          if (this.hideCompleteChars === char.characterId) { return true; }
          doneChar = true;
        }
      } else if (char.baseCharacterLevel >= char.maxLevel) {
        if (char.milestones[mileStoneName.key] == null && !mileStoneName.neverDisappears) {
          if (this.hideCompleteChars === char.characterId) { return true; }
          doneChar = true;
        }
      }
      allDone = allDone && doneChar;
    }
    if (this.hideCompleteChars === 'ALL' && allDone) { return true; }
    return false;
  }

  public sortByName(): void {
    if (this.state.sort === 'nameAsc') {
      this.state.sort = 'nameDesc';
    } else {
      this.state.sort = 'nameAsc';
    }
  }
  public sortByReset(): void {
    if (this.state.sort === 'resetDesc') {
      this.state.sort = 'resetAsc';
    } else {
      this.state.sort = 'resetDesc';
    }
  }

  public sortByRewards(): void {
    if (this.state.sort === 'rewardsDesc') {
      this.state.sort = 'rewardsAsc';
    } else {
      this.state.sort = 'rewardsDesc';
    }
  }
}
