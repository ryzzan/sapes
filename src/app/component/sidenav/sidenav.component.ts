import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input()
  user;

  urlToNotionManual = environment.urlToNotionManual+"#320908f415124263ab86507c3d12197c";
  name;  
  private menu;

  constructor(private router: Router) { }

  ngOnInit() {
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
    window.location.replace('/login');
  }
}
