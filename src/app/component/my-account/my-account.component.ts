import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    this.userForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'username': new FormControl('')
    });
  }

  ngOnInit() {
  }

}
