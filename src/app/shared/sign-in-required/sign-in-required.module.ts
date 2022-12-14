import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SignInRequiredComponent } from './sign-in-required.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [SignInRequiredComponent],
  exports: [SignInRequiredComponent]
})
export class SignInRequiredModule { }
