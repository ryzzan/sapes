import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  user;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.user = user
    });

    this.authService.getUser();
  }
  title = "Avaliação do Concluinte"
  ngOnInit() {
  }

}
