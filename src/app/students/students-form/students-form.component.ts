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
  formPagination: any = {
    maxIndex: 4,
    index: 1
  };
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  triedSend: boolean = false;
  canSave: boolean = false;
  bdInfo : any = {};
  disabilityFlag: boolean;

  steps: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public snackBar: MdSnackBar
  ) {
    this.bdInfo = {
      courses: [{id: 1, description: "Gestão ambiental"}],
      origins: [{id: 1, value: 'Escola Particular'},{id: 2, value: 'Escola Pública'}],
      genders: [{id: 1, value: 'Masculino'},{id: 2, value: 'Feminino'}],
      estagios: [
        'Estágio',
        'Aluno Cotista/Aprendiz',
        'Empresário/Sócio proprietário',
        'Empregado com carteira assinada',
        'Empregado sem carteira assinada',
        'Empregado temporário com carteira assinada',
        'Empregado temporário sem carteira assinada',
        'Profissional liberal (dentista, advogado...)',
        'Autônomo (por conta própria)',
        'Funcionário público/militar',
        'Outra situação? Qual?'
      ],
      ethnicities: [{id:1,value:'Branca'}, {id:2,value:'Preta'}, {id:3,value:'Amarela'}, {id:4,value:'Indígena'},{id:5,value:'Parda'}],
      disabilities: [
        {id:1, value: 'Auditiva'}, {id:2, value: 'Intelectual'}, {id:3, value: 'Física'},{id:4, value: 'Condutas típicas'},
        {id:5, value: 'Visual'}, {id:6, value: 'Múltiplas'},{id:7, value: 'Altas habilidades'}, {id:8, value: 'Outro (s)'}
      ],
      months: [
        {id: 1,valueView:'Janeiro'}, {id: 2,valueView:'Fevereiro'}, {id: 3,valueView:'Março'},
        {id: 4,valueView:'Abril'}, {id: 5,valueView:'Maio'}, {id: 6,valueView:'Junho'},
        {id: 7,valueView:'Julho'}, {id: 8,valueView:'Agosto'}, {id: 9,valueView:'Setembro'},
        {id: 10,valueView:'Outubro'}, {id: 11,valueView:'Novembro'}, {id: 12,valueView:'Dezembro'}
      ],
      years: [2016, 2015, 2014,2013],
      bancos: ['Virá do banco'],
      regionals: [
        {description:'Acre',sigla:'AC'},{description:'Alagoas',sigla:'AL'},{description:'Amapá',sigla:'AP'},{description:'Amazonas',sigla:'AM'},
        {description:'Bahia',sigla:'BA'},{description:'Ceará',sigla:'CE'},{description:'Distrito Federal',sigla:'DF'},{description:'Espírito Santo',sigla:'ES'},
        {description:'Goiás',sigla:'GO'},{description:'Maranhão',sigla:'MA'},{description:'Mato Grosso',sigla:'MT'},{description:'Mato Grosso do Sul',sigla:'MS'},
        {description:'Minas Gerais',sigla:'MG'},{description:'Pará',sigla:'PA'},{description:'Paraíba',sigla:'PB'},{description:'Paraná',sigla:'PR'},
        {description:'Pernambuco',sigla:'PE'},{description:'Piauí',sigla:'PI'},{description:'Rio de Janeiro',sigla:'RJ'},{description:'Rio Grande do Norte',sigla:'RN'},
        {description:'Rio Grande do Sul',sigla:'RS'},{description:'Rondônia',sigla:'RO'},{description:'Roraima',sigla:'RR'},{description:'Santa Catarina',sigla:'SC'},
        {description:'São Paulo',sigla:'SP'},{description:'Sergipe',sigla:'SE'},{description:'Tocantins', sigla:'TO'}
      ],
      units: [
        {'id':4,description: "UNIDADE MÓVEL ELETROELETRÔNICA"},
      ],
      modalities: [
        {id:2, description: 'QUALIFICAÇÃO PROFISSIONAL'}, {'id':4,description: "APRENDIZAGEM INDUSTRIAL TÉCNICA DE NÍVEL MÉDIO"},
      ],
      areas: [
        {'id':2,description: "ALIMENTOS E BEBIDAS"},
      ],
      occupations: [
        {'id':2,description: "OFICIAL GENERAL DO EXÉRCITO"},
      ]
    }
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
      origin_id: [null,Validators.required],
      ethnicity_id: [null,[Validators.required]],
      disability: [null],
      disability_id: [null]
    })
    this.steps[1] = this.formBuilder.group({
      start_year: [null, [Validators.required]],
      start_month: [null, [Validators.required]],
      end_month: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      regional: [null, [Validators.required]],
      unit_id: [null, [Validators.required]],
      modality_id: [null, [Validators.required]],
      area_id: [null, [Validators.required]],
      occupation_id: [null, [Validators.required]]
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
    userValue.end_year = 2017;
    userValue.class = 2;
    userValue.regimental_gratuity = 2;
    userValue.agreement = 2;
    userValue.pronatec = 2;
    userValue.city_id = 2;
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
