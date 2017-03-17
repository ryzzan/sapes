import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { InputErrorComponent } from './../component/input-error/input-error-component';
import { ProgressComponent } from '../component/progress/progress.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  entryComponents: [
    ProgressComponent
  ],
  exports: [
    InputErrorComponent,
    MaterialModule,
    ProgressComponent
  ],
  declarations: [
    InputErrorComponent,
    ProgressComponent
  ]
})
export class SharedModule { }
