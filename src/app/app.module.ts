import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { AppRoutingModule } from './app.routing.module';
import { StudentsModule } from './students/students.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { CorporateService } from './shared/corporate.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginGuard } from './shared/auth/login.guard';
import { ApiService } from './shared/api.service';
import { SharedModule } from './shared/shared.module';
import { FirstAndLastNamePipe } from './pipes/first-and-last-name.pipe';
import { MyAccountComponent } from './component/my-account/my-account.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    FirstAndLastNamePipe,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    StudentsModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ApiService,
    AuthService,
    LoginGuard,
    CorporateService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
