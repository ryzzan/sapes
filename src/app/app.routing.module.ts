import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './shared/auth/auth.guard';
import { LoginGuard } from './shared/auth/login.guard';
import { HomeComponent} from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent} from './login/login.component';
import { MyAccountComponent } from './component/my-account/my-account.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'not-found', component: NotFoundComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'my-account', component: MyAccountComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
