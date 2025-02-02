import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MilestoneCheckComponent } from './milestone-check.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  declarations: [MilestoneCheckComponent],
  exports: [MilestoneCheckComponent]
})
export class MilestoneCheckModule { }
