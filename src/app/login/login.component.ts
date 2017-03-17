import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login:string;
  public password:string;
  loginForm: FormGroup;
  isLoading: boolean = false;
  triedSend: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar
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
    
    this.snackBar.open('Aguarde a tentiva de login.','',{duration: 1000});
    let obj = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(obj)
    .subscribe(
      res => {
        if(res){
          this.snackBar.open('Login feito com sucesso. Carregando seus dados.','',{duration: 2000});
          
          this.router.navigateByUrl('/');
          this.isLoading =  false;
        }    
      },
      error => {
        if(error.status == 401){
          return this.snackBar.open('Login ou senha incorreto','',{duration: 3000});
        }
        return this.snackBar.open('Algo errado aconteceu, por favor, tente novamente','',{duration: 4000});
      },
      () => {
        
      }
    )
    

  }

}

