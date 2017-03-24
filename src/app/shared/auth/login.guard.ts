import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  isAuthenticated;
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    // If user is logged in, component related to this guard won't load
    if(this.auth.getToken()) {
      return false;
    }
    return true;
  }
}