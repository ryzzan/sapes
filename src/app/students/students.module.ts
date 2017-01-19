import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { StudentsComponent }   from './students.component';
import { StudentsRoutingModule } from './students.routing';
import { StudentsFormComponent } from './students-form/students-form.component';
import { DatapickerComponent } from '../datapicker/datapicker.component';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2TableModule,NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { StudentsService } from './students.service'
import { StudentsListComponent } from './students-list/students-list.component';


@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    MaterialModule,
    TextMaskModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    HttpModule
  ],
  exports: [    NgTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective
  ],
  declarations: [
    DatapickerComponent,
    StudentsComponent,
    StudentsFormComponent,
    StudentsListComponent
  ],
  providers: [StudentsService],
})

export class StudentsModule { }
