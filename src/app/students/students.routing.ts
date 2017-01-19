import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsListComponent } from './students-list/students-list.component';


const studentsRoutes: Routes = [{
  path: 'students', component: StudentsComponent, children: [
    { path: '', component: StudentsListComponent },
    { path: 'add', component: StudentsFormComponent },
    { path: ':id', component: StudentsComponent },
    { path: ':id/edit', component: StudentsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(studentsRoutes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule {

}
