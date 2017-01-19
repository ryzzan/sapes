import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  colours = [];
  disabilities = [];
  constructor() {
      this.colours = ['Branca', 'Preta', 'Amarela', 'Indígena','Parda'];
      this.disabilities = ['Auditiva', 'Intelectual', 'Física', 'Condutas típicas', 'Visual', 'Múltiplas', 'Altas habilidades', 'Outro (s)'];
  }
  ngOnInit() {
  }


}
