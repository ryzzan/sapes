import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  colours = [];
  disabilities = [];
  constructor() {
      this.colours = ['Branca', 'Preta', 'Amarela', 'Indígena','Parda'];
      this.disabilities = ['Auditiva', 'Intelectual', 'Física', 'Condutas típicas', 'Visual', 'Múltiplas', 'Altas habilidades', 'Outro (s)'];
  }

  ngOnInit() {
  }

}
