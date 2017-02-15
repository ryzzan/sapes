import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }
  getUser(){
    let token = sessionStorage.getItem('user');
    if(!token) return null;
    return token;
  }
  login(data){
    if(data.login!="sapes" || data.password != "123") return false;
    sessionStorage.setItem('user', JSON.stringify({DR: "DN",user: "SAPES ADM"}));
    return true;
  }
  logout(){
    sessionStorage.removeItem('user');
  }

}
