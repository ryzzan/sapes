import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent} from './home/home.component'
import { TesteComponent} from './teste/teste.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent} from './login/login.component';
import { DatagridComponent} from './datagrid/datagrid.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'teste', component: TesteComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'datagrid', component: DatagridComponent },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
