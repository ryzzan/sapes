import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent implements OnInit {
  @Input() control:any;
  @Input() errorDefs:any;

  constructor() {
  }
  ngOnInit() {
    console.log(this.control);
  }

}
