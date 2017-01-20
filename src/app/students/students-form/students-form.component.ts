import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  colours = [];
  disabilities = [];
  meses = [];
  anos = [];
  bancos = [];
  estagios = [];
  constructor() {
      this.estagios = ['Estágio','Aluno Cotista/Aprendiz','Empresário/Sócio proprietário','Empregado com carteira assinada','Empregado sem carteira assinada','Empregado temporário com carteira assinada','Empregado temporário sem carteira assinada','Profissional liberal (dentista, advogado...)','Autônomo (por conta própria)','Funcionário público/militar','Outra situação? Qual?'];
      this.colours = ['Branca', 'Preta', 'Amarela', 'Indígena','Parda'];
      this.disabilities = ['Auditiva', 'Intelectual', 'Física', 'Condutas típicas', 'Visual', 'Múltiplas', 'Altas habilidades', 'Outro (s)'];
      this.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',];
      this.anos = ['2017', '2016', '2015', '2014','2013'];
      this.bancos = ['Virá do banco'];
}

  ngOnInit() {
  }

}
