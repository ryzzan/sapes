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
    console.log('entrou');
    this.corporateService.getData()
      .subscribe( data =>{
        console.log("entrou2");
        console.log(data);
      },
      response => {
        console.log("entrou", response);
      });
  }
}
