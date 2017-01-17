import { Component, OnInit } from '@angular/core';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');


@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  title = `app works!`;
  date: any;
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  mask: any;

  constructor() {
    this.mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
  }

}
