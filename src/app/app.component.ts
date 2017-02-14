import { Component } from '@angular/core';
import { CorporateService } from './shared/corporate.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private corporateService: CorporateService){
    this.corporateService.getToken();
  }
}
