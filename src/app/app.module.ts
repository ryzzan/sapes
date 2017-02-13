import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MdDataTableModule } from 'ng2-md-datatable';
import { RTModule } from 'right-angled';

import 'hammerjs';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AppRoutingModule } from './app.routing.module';
import { StudentsModule } from './students/students.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { CorporateService } from './shared/corporate.service';
import { ProgressComponent } from './component/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    DatagridComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StudentsModule,
    AppRoutingModule,
    MdDataTableModule.forRoot(),
    RTModule
  ],
  providers: [
    CorporateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
