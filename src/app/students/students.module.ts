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
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { StudentsService } from './shared/students.service';
import { StudentsListComponent } from './students-list/students-list.component';
import { InputErrorComponent } from '../component/input-error/input-error-component'
import { ProgressComponent } from '../component/progress/progress.component';

@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    HttpModule
  ],
  exports: [
    NgTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective,
    MaterialModule
  ],
  entryComponents: [
    ProgressComponent
  ],
  declarations: [
    DatapickerComponent,
    StudentsComponent,
    StudentsFormComponent,
    StudentsListComponent,
    InputErrorComponent,
    ProgressComponent
  ],
  providers: [StudentsService],
})

export class StudentsModule { }
