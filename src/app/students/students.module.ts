import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StudentsComponent }   from './students.component';
import { StudentsRoutingModule } from './students.routing';
import { StudentsFormComponent } from './students-form/students-form.component';
import { DatapickerComponent } from '../datapicker/datapicker.component';
import { TextMaskModule } from 'angular2-text-mask';
import { StudentsService } from './shared/students.service';
import { StudentsListComponent } from './students-list/students-list.component';
import { SelectCourseComponent } from './select-course/select-course.component';
import { MoneyMaskPipe } from './../pipes/money-mask.pipe'
import { GetNumberPipe } from './../pipes/get-number.pipe';
import { ArrayGeneratorPipe } from './../pipes/array-generator.pipe';
import { ShowNumberPipe } from './../pipes/show-number.pipe';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpModule,
    SharedModule
  ],
  entryComponents: [
    SelectCourseComponent
  ],
  declarations: [
    MoneyMaskPipe,
    DatapickerComponent,
    StudentsComponent,
    StudentsListComponent,
    SelectCourseComponent,
    StudentsFormComponent,
    GetNumberPipe,
    ShowNumberPipe,
    ArrayGeneratorPipe
  ],
  providers: [StudentsService],
})

export class StudentsModule { }
