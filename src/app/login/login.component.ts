import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login:string;
  public password:string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

  }
  save(login,password){
    let obj = {
      password: password,
      login: login
    }
    console.log(obj);
    if(this.authService.login(obj)){

      return this.router.navigateByUrl('/');
    }

  }

}

