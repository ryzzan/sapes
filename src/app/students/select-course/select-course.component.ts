import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent implements OnInit {
  @Input() info: any;
  @Input() ref:any;
  @Input() courses: any;
  selectedValue = null;
  selected(){
    console.log("selecionado");
  }
  constructor() {
    this.courses = [{course_id: 1, course_name: "curso 1"},{id: 2, course_name: "curso 2"}];
  }
  ngOnInit() {

  }

}
