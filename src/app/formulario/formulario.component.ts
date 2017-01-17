import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  colours = [];
  constructor() {
      this.colours = ['Branca', 'Preta', 'Amarela', 'Indígena','Parda'];
  }
  ngOnInit() {
  }
  

}

