import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { StudentsComponent }   from './students.component';
import { StudentsRoutingModule } from './students.routing';
import { StudentsFormComponent } from './students-form/students-form.component';
import { DatapickerComponent } from '../datapicker/datapicker.component';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2TableModule,NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { StudentsService } from './shared/students.service';
import { StudentsListComponent } from './students-list/students-list.component';
import { InputErrorComponent } from '../component/input-error/input-error-component'
import { ProgressComponent } from '../component/progress/progress.component';
import { SelectCourseComponent } from './select-course/select-course.component';
import { MoneyMaskPipe } from './../pipes/money-mask.pipe'
import { GetNumberPipe } from './../pipes/get-number.pipe';
import { ArrayGeneratorPipe } from './../pipes/array-generator.pipe';
import { ShowNumberPipe } from './../pipes/show-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule,
    Ng2TableModule,
    HttpModule,
  ],
  exports: [
    NgTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective,
    MaterialModule
  ],
  entryComponents: [
    ProgressComponent,
    SelectCourseComponent
  ],
  declarations: [
    MoneyMaskPipe,
    DatapickerComponent,
    StudentsComponent,
    StudentsListComponent,
    InputErrorComponent,
    ProgressComponent,
    SelectCourseComponent,
    StudentsFormComponent,
    GetNumberPipe,
    ShowNumberPipe,
    ArrayGeneratorPipe
  ],
  providers: [StudentsService],
})

export class StudentsModule { }
