import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthService {
  permissions = 
  [
    {
      profileDescription: "ADMINISTRADOR DO SISTEMA",
      create: true,
      update: true,
      delete: true
    }, {
      profileDescription: "COORDENADOR NACIONAL",
      create: true,
      update: true,
      delete: true
    }, {
      profileDescription: "GESTOR NACIONAL",
      create: false,
      update: false,
      delete: false
    }, {
      profileDescription: "COORDENADOR REGIONAL",
      create: true,
      update: true,
      delete: true
    }, {
      profileDescription: "GESTOR REGIONAL",
      create: false,
      update: false,
      delete: false
    }, {
      profileDescription: "DIGITADOR REGIONAL",
      create: true,
      update: false,
      delete: false
    }, {
      profileDescription: "COORDENADOR ESCOLAR",
      create: true,
      update: true,
      delete: true
    }, {
      profileDescription: "DIGITADOR ESCOLAR",
      create: true,
      update: false,
      delete: false
    }, {
      profileDescription: "ALUNO",
      create: true,
      update: false,
      delete: false
    }
  ];

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
    
    /*Create first and last name attribute start*/
    let array = user['name'].split(" ");

    if(array.length > 1) {
      user['firstAndLastname'] = array[0] + " " + array[array.length - 1];
    } else {
      user['firstAndLastname'] = array[0];
    }
    /*Create first and last name attribute end*/

    user['permissions'] = this.permissions[user['profile_id']-1];
    
    if(user){
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
    data.permissions = this.permissions[data['profile_id']-1];

    /*Create first and last name attribute start*/
    let array = data.name.split(" ");

    if(array.length > 1) {
      data.firstAndLastname = array[0] + " " + array[array.length - 1];
    } else {
      data.firstAndLastname = array[0];
    }
    /*Create first and last name attribute end*/

    this.user.emit(data);
    return true;
  }

  logout(){
    sessionStorage.removeItem('user');
  }

}
