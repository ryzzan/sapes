import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthService {
  url = "https://sapesapi.nitrofull.com.br/oauth/token";
  headers: Headers;
  options: RequestOptions;

  constructor(
    private http: Http
  ) { 
    this.headers = new Headers({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'
    });
    this.options = new RequestOptions({
      'headers': this.headers
    })
  }

  getUser(){
    let token = sessionStorage.getItem('user_token');
    if(!token) return null;
    return token;
  }
  getToken(){
    let token = sessionStorage.getItem('user_token');
    if(!token) return null;
    return token;
  }

  login(data: any){
    return this.http
    .post(
      this.url, 
      {
        'client_secret': 'uGUNmd2yK3ux31tulaMhaDWIjbeHlur6f94a387J', 
        'client_id': 2, 
        'grant_type': 'password',
        'username': data.login,
        'password': data.password
      },
      this.options
    ).map(res => 
      this.setToken(res.json())
    )
    // .catch(error => Observable.throw(error.json().error || 'Server error')); //...errors if                  
  }
  setToken(data){
    sessionStorage.setItem('user_token', JSON.stringify(data));
    sessionStorage.setItem('access_token', data.access_token);
    
    let string = 'Bearer '+sessionStorage.getItem('access_token');
    
    return this.http
    .get(
      'https://sapesapi.nitrofull.com.br/api/user?Authorization='+string
    ).map(res => 
      console.log(res.json())
    );
  }

  logout(){
    sessionStorage.removeItem('user');
  }

}
