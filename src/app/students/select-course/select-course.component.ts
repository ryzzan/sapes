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
  selectedCouseValue:number = null;
  regional = "";
  constructor() {
    // this.courses = [
    //   {course_id: 1, course_name: "curso 1"},
    //   {course_id: 2, course_name: "curso 2"}
    // ];
  }
  courseChanged(value){
    let course = this.courses.filter(course =>
      course.course_id == value
    )[0];
    this.selectedCouseValue = course;
    this.regional = course.regional;
  }
  courseSelected(){
    this.ref.close(this.selectedCouseValue);
  }
  ngOnInit() {
  }

}
