import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthService {
  url = "https://sapesapi.nitrofull.com.br/oauth/token";
  headersToAuth: Headers;
  optionsToAuth: RequestOptions;
  
  headersToUser: Headers;
  optionsToUser: RequestOptions;
  user: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: Http
  ) { 
    this.headersToAuth = new Headers({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })
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
      this.optionsToAuth
    ).map(res => 
      this.setToken(res.json())
    )
    // .catch(error => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  setToken(data){
    sessionStorage.setItem('user_token', JSON.stringify(data));
    sessionStorage.setItem('access_token', data.access_token);

    let string = 'Bearer '+sessionStorage.getItem('access_token');
    return this.getUserData(string);
  }
  getUser(){
    let user = sessionStorage.getItem('user');
    if(!user) return false;
    user = JSON.parse(user);
    user = user ? user : null;
    if(user){
      console.log(user);
      this.user.emit(user);
    } 
  }
  getUserData(string) {
    this.headersToUser = new Headers({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
      'Authorization': string
    })
    
    this.optionsToUser = new RequestOptions({
      'headers': this.headersToUser
    })

    return this.http
    .get(
      'https://sapesapi.nitrofull.com.br/api/user',
      this.optionsToUser
    ).map(res => 
      this.setUserData(res.json())
    )
  }

  setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data))
    console.log("Entrou");
    this.user.emit(data);
    return true;
  }

  logout(){
    sessionStorage.removeItem('user');
  }

}
