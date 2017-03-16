import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputErrorComponent } from './../component/input-error/input-error-component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    InputErrorComponent
  ],
  declarations: [
    InputErrorComponent
  ]
})
export class SharedModule { }
