import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MdDataTableModule } from 'ng2-md-datatable';
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
import { ApiService } from './shared/api.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    StudentsModule,
    AppRoutingModule,
    MdDataTableModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthService,
    CorporateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
