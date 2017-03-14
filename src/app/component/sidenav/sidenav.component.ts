import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() logout:any;
  constructor() { }
  private menu;
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

}
