import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

import { Student } from '../shared/student';
import { StudentsService } from '../shared/students.service';
import { BasicValidators } from '../../shared/basic-validators';


@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  student: Student = new Student();

  autoCorrectedDatePipe = autoCorrectedDatePipe;
  mask: any;

  disabilityFlag: boolean;
  ethnicities = [];
  disabilities = [];
  meses = [];
  anos = [];
  bancos = [];
  estagios = [];
  genders = [];
  distance_education = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    this.mask = [/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/,/\d/];

    this.distance_education = [{id: 1, value: 'Escola Particular'},{id: 2, value: 'Escola Pública'}];
    this.genders = [{id: 1, value: 'Masculino'},{id: 2, value: 'Feminino'}];
    this.estagios = ['Estágio','Aluno Cotista/Aprendiz','Empresário/Sócio proprietário','Empregado com carteira assinada','Empregado sem carteira assinada','Empregado temporário com carteira assinada','Empregado temporário sem carteira assinada','Profissional liberal (dentista, advogado...)','Autônomo (por conta própria)','Funcionário público/militar','Outra situação? Qual?'];
    this.ethnicities = [{id:1,value:'Branca'}, {id:2,value:'Preta'}, {id:3,value:'Amarela'}, {id:4,value:'Indígena'},{id:5,value:'Parda'}];
    this.disabilities = [{id:1, value: 'Auditiva'}, {id:2, value: 'Intelectual'}, {id:3, value: 'Física'}, {id:4, value: 'Condutas típicas'}, {id:5, value: 'Visual'}, {id:6, value: 'Múltiplas'}, {id:7, value: 'Altas habilidades'}, {id:8, value: 'Outro (s)'}];
    this.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',];
    this.anos = ['2017', '2016', '2015', '2014','2013'];
    this.bancos = ['Virá do banco'];
  }
  teste(event){
    console.log(event)
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      cpf_number: [null,
        Validators.required
      ],
      name: [
        '',
        Validators.required
      ],
      rg_number: [null,
        Validators.required
      ],
      cell_phone: ['',
        Validators.required
      ],
      address: ['',[
        Validators.required
      ]],
      gender: [],
      distance_education: [],
      ethnicity_id: [],
      disability_id: [this.student.disability_id]
    });
      var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Editar Concluinte' : 'Novo Concluinte';
      if (!id)
        return;

      this.studentsService.getStudent(id)
        .subscribe(
          student => {
            this.student = student;
            this.disabilityFlag = this.student.disability_id>0;
              (<FormGroup>this.form).patchValue(this.student, { onlySelf: true });
          },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });

  }
   save() {
    var result,
    userValue = this.form.value;
    userValue.user_id=1;
    userValue.start_year = 2016;
    userValue.end_month = 2;
    userValue.end_year = 2011;
    userValue.course_id = 1;
    userValue.regional = 3;
    userValue.unit_id = 4;
    userValue.area_id = 2;
    userValue.occupation_id = 2;
    userValue.class = 2;
    userValue.regimental_gratuity = 2;
    userValue.agreement = 2;
    userValue.pronatec = 2;
    userValue.origin_id = 2;
    userValue.city_id = 2;
    userValue.modality_id = 3;
    userValue.start_month = 3;
    if(!this.disabilityFlag){
      userValue.disability_id = null;
    }
    if (this.student.id){
      userValue.id = this.student.id;
      result = this.studentsService.updateStudent(userValue);
    } else {
      result = this.studentsService.addStudent(userValue);
    }

    result.subscribe(data => this.router.navigate(['students']));
  }

}
