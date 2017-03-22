import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


import { AuthGuard } from './../shared/auth/auth.guard';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsViewComponent } from './students-view/students-view.component';


const studentsRoutes: Routes = [{
  path: 'students', component: StudentsComponent, children: [
    { path: '', component: StudentsListComponent,  pathMatch: 'full'},
    { path: 'add', component: StudentsFormComponent },
    { path: ':id', component: StudentsFormComponent },
    { path: 'view/:id', component: StudentsViewComponent }
  ], canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(studentsRoutes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule {

}
