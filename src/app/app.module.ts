import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { FormularioComponent } from './formulario/formulario.component';

import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DatapickerComponent } from './datapicker/datapicker.component'

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    SidenavComponent,
    HomeComponent,
    ListComponent,
    DatapickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    TextMaskModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
