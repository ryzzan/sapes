import { Component } from '@angular/core';
import { CorporateService } from './shared/corporate.service'
import { AuthService } from './shared/auth.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private user = null;
  constructor(
    private corporateService: CorporateService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.corporateService.getToken();
    this.user = this.authService.getUser();

    this.router.events.subscribe(params => {
      this.user = this.authService.getUser();
      if(this.user == null && params['url']!="/login"){
        this.router.navigate(['login']);
      }
    })
  }
  logout(){
    this.authService.logout();
  }
}
