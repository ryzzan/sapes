import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() message:any = '';
  @Input() progress:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
