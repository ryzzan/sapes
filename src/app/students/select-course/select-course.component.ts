import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent implements OnInit {
  selectedValue = null;
  constructor() { }
  foods = [{value: 1, viewValue: "curso 1"},{value: 2, viewValue: "curso 2"}]
  ngOnInit() {
  }

}
