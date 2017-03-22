import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentsService } from './../shared/students.service';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.css']
})
export class StudentsViewComponent implements OnInit {
  student;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.studentsService.getStudent(id)
      .subscribe(
        student => {
          this.student = student;
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });
  }

}
