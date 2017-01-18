import { Component, OnInit } from '@angular/core';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

@Component({
  selector: 'datapicker',
  templateUrl: './datapicker.component.html',
  styleUrls: ['./datapicker.component.css']
})
export class DatapickerComponent implements OnInit {

  date: any;
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  mask: any;

  constructor() {
    this.mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
  }

}
