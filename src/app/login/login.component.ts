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
  loginForm: FormGroup;
  canSave: boolean = false;
  triedSend: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      'login': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  save(): any{
    if(!this.loginForm.valid) 
      return this.triedSend = true;

    let obj = this.loginForm.value;
    
    this.authService.login(obj)
    .subscribe(res => {
      res ? this.router.navigateByUrl('/') : console.log("Não rolou o login");
    })

  }

}

