import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MdSnackBar} from '@angular/material';

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
  title: string;
  form: FormGroup;
  student: Student = new Student();
  mask: any = {
      cpf: [/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/,/\d/],
      date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  formPagination: any = {};
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  triedSend: boolean = false;
  canSave: boolean = false;
  bdInfo : any = {};
  disabilityFlag: boolean;

  ethnicities = [];
  disabilities = [];
  months = [];
  years = [];
  bancos = [];
  estagios = [];
  genders = [];
  distance_education = [];

  steps: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public snackBar: MdSnackBar
  ) {
    this.formPagination.total = 4;
    this.formPagination.index = 0;


    this.bdInfo = {
    }
    this.distance_education = [{id: 1, value: 'Escola Particular'},{id: 2, value: 'Escola Pública'}];
    this.genders = [{id: 1, value: 'Masculino'},{id: 2, value: 'Feminino'}];
    this.estagios = ['Estágio','Aluno Cotista/Aprendiz','Empresário/Sócio proprietário','Empregado com carteira assinada','Empregado sem carteira assinada','Empregado temporário com carteira assinada','Empregado temporário sem carteira assinada','Profissional liberal (dentista, advogado...)','Autônomo (por conta própria)','Funcionário público/militar','Outra situação? Qual?'];
    this.ethnicities = [{id:1,value:'Branca'}, {id:2,value:'Preta'}, {id:3,value:'Amarela'}, {id:4,value:'Indígena'},{id:5,value:'Parda'}];
    this.disabilities = [{id:1, value: 'Auditiva'}, {id:2, value: 'Intelectual'}, {id:3, value: 'Física'}, {id:4, value: 'Condutas típicas'}, {id:5, value: 'Visual'}, {id:6, value: 'Múltiplas'}, {id:7, value: 'Altas habilidades'}, {id:8, value: 'Outro (s)'}];
    this.months = [{id: 1,valueView:'Janeiro'}, {id: 1,valueView:'Fevereiro'}, {id: 1,valueView:'Março'}, {id: 1,valueView:'Abril'}, {id: 1,valueView:'Maio'}, {id: 1,valueView:'Junho'}, {id: 1,valueView:'Julho'}, {id: 1,valueView:'Agosto'}, {id: 1,valueView:'Setembro'}, {id: 1,valueView:'Outubro'}, {id: 1,valueView:'Novembro'}, {id: 1,valueView:'Dezembro'}];
    this.years = [2016, 2015, 2014,2013];
    this.bancos = ['Virá do banco'];
  }
  teste(event){
    console.log(event)
  }
  ngOnInit() {
    this.steps[0] = this.formBuilder.group({
      cpf_number: [null,
        Validators.compose([
          Validators.required,
          BasicValidators.cpf
        ])
      ],
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ])
      ],
      rg_number: [null, Validators.required],
      birth_date: ['',
        Validators.compose([
          Validators.required,
          BasicValidators.date
        ])
      ],
      gender: [null, [Validators.required]],
      distance_education: [null,Validators.required],
      ethnicity_id: [null,[Validators.required]],
      disability: [null],
      disability_id: [null]
    })
    this.steps[1] = this.formBuilder.group({
      start_year: [null, [Validators.required]],
      start_month: [null, [Validators.required]],
      end_month: [null, [Validators.required]],
    });

    this.steps[2] = this.formBuilder.group({
    });

    this.steps[3] = this.formBuilder.group({
    });

    this.steps[4] = this.formBuilder.group({
    });

    this.form = this.formBuilder.group({
      aluno: this.steps[0],
      turma: this.steps[1]
    });
    var id = this.route.params.subscribe(params => {
    var id = params['id'];

    this.title = id ? 'Editar Concluinte' : 'Novo Concluinte';
    if (!id) return this.canSave = true;

    this.studentsService.getStudent(id)
      .subscribe(
        student => {
          this.student = student;
          this.disabilityFlag = this.student.disability_id>0;
          this.student['birth_date'] = this.transformDateBR(this.student['birth_date'])
          this.canSave = true;
            (<FormGroup>this.steps[0]).patchValue(this.student);
            (<FormGroup>this.steps[1]).patchValue(this.student);
          setTimeout(()=>this.bugFixPlaceholder(), 200);
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });

  }
  changedTabIndex(event){
    this.bugFixPlaceholder(event);
    this.formPagination.index = event.index
  }
  bugFixPlaceholder(info = null){
    if(info != null){
      if(info.index==1) return false;
    }
    let el = document.querySelectorAll('input[formControlName], input.md-radio-input:checked');
    for(let indice = el.length; indice>0; indice--){
      el[indice-1].dispatchEvent(new Event('input'));
      el[indice-1].dispatchEvent(new Event('change'));
    }
  }
  getNumber(cpf){
    return cpf.replace(/[/_.-]/g, '');
  }
  save() {

    if(!this.form.valid) return this.triedSend = true;
    this.canSave = false;

    var result,
    userValue = Object.assign(this.steps[0].value,this.steps[1].value);
    userValue.user_id=1;
    userValue.end_month = 2;
    userValue.end_year = 2017;
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
    delete userValue['disability'];

    console.log(userValue);

    if(userValue){
      let data = userValue['birth_date'].split('/');
      userValue['birth_date'] = data[2]+"-"+data[1]+"-"+data[0];
    }

    if (this.student.id){
      userValue.id = this.student.id;
      result = this.studentsService.updateStudent(userValue);
    } else {
      result = this.studentsService.addStudent(userValue);
    }

    result.subscribe(data => {
      this.canSave = true;
      this.snackBar.open('Salvo com sucesso!', '', {
          duration: 4000,
      });
      // this.router.navigate(['students']);
    });
  }

  transformDateBR(date){
      if(!date) return '';
      if(date.length!=10) return '';
      let data = date.split('-');
      return data[2]+"/"+data[1]+"/"+data[0];
  }
}
