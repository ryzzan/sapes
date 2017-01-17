import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';

import { FormularioComponent } from './formulario/formulario.component';

import { TextMaskModule } from 'angular2-text-mask';
import { DataComponent } from './data/data.component'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,

    FormularioComponent,

    DataComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
