import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MdDataTableModule } from 'ng2-md-datatable';

import 'hammerjs';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AppRoutingModule } from './app.routing.module';
import { StudentsModule } from './students/students.module';
import { HomeComponent } from './home/home.component';
import { TesteComponent } from './teste/teste.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Teste2Component } from './teste/teste2/teste2.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    TesteComponent,
    Teste2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StudentsModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    MdDataTableModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
