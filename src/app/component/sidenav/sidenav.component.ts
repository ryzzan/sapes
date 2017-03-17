import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private menu;
  user = sessionStorage.getItem('user');

  constructor(private router: Router) {
    this.user = JSON.parse(this.user);
  }

  ngOnInit() {
    console.log(this.user);
    this.menu = [
      {
        icon: 'filter_1',
        text: 'Avaliação do Concluinte',
        link: 'students'
      }, {
        icon: 'filter_2',
        text: 'Avaliação do Egresso',
        link: 'egressos'
      }, {
        icon: 'filter_3',
        text: 'Avaliação da Empresa',
        link: 'teste'
      },
    ]
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
