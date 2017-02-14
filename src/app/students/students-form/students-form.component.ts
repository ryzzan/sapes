import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

import { Student } from '../shared/student';
import { CorporateService } from '../../shared/corporate.service';
import { StudentsService } from '../shared/students.service';
import { BasicValidators } from '../../shared/basic-validators';

import { bdInfo } from './data';

import { ProgressComponent } from '../../component/progress/progress.component';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {
  title: string;
  form: FormGroup;
  student: Student = new Student();
  private token = {};
  mask: any = {
    cpf: [/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-', /\d/,/\d/],
    date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    zip: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    phone: ['(', /\d/, /\d/, ')',' ' , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,],
    cell_phone: ['(', /\d/, /\d/, ')',' ' , /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]
  };
  formPagination: any = {
    maxIndex: 4,
    index: 0
  };
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  triedSend: boolean = false;
  canSave: boolean = false;
  bdInfo : any = {};

  steps: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public snackBar: MdSnackBar,
    private corporateService: CorporateService
  ) {
    this.bdInfo = bdInfo;
  }
  teste(event){
    console.log(event);
  }
  changeDisabled(form, formName, checked){
    if(checked){
      return form.controls[formName].enable();
    }

    form.controls[formName].disable();

    let obj = {};
    obj[formName] = null;
    form.patchValue(obj);
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
      occupation_id: [null, [Validators.required]],
      class: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],
      distance_education: [null],
      regimental_gratuity: [null],
      agreement: [null],
      agreement_name: [null],
      pronatec_id : [null]
    });

    this.steps[2] = this.formBuilder.group({
      address: [null, [Validators.required]],
      address_number: [null, [Validators.required]],
      address_complement: [null, [
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      address_district: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]],
      address_zip_code: [null, [
        BasicValidators.zip
      ]],
      city_id: [null, [Validators.required]],
      home_phone: [null, [
        BasicValidators.phone
      ]],
      cell_phone: [null, [
        BasicValidators.cell_phone
      ]],
      alternative_phone: [null, [
        BasicValidators.cell_phone
      ]],
      email: [null, [
        BasicValidators.email,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]]
    });

    this.steps[3] = this.formBuilder.group({
      question_4_1: [null],
      question_4_2: [null, [Validators.required]],
      question_4_3: [null, [Validators.required]]
    });

    this.steps[4] = this.formBuilder.group({
      question_5_1: [null, [Validators.required]]
    });

    this.form = this.formBuilder.group({
      aluno: this.steps[0],
      curso: this.steps[1],
      contato: this.steps[2],
      situacao: this.steps[3],
      avaliacao: this.steps[4]
    });
    var id = this.route.params.subscribe(params => {
    var id = params['id'];

    this.title = id ? 'Editar Concluinte' : 'Novo Concluinte';
    if (!id) {
      return this.canSave = true
    };

    this.studentsService.getStudent(id)
      .subscribe(
        student => {
          this.student = student;
          this.student['birth_date'] = this.transformDateBR(this.student['birth_date'])
          this.canSave = true;
          this.setValues();
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });

  }
  getCorporateValue(value, btn){
    if(!this.steps[0].controls['cpf_number'].valid) return false;
    btn.disabled = true;
    let feedback = this.snackBar.openFromComponent(ProgressComponent);
    feedback.instance.message = "Buscando concluinte";
    feedback.instance.progress = true;
    value = this.getNumber(value);
    this.corporateService.getStudent(value).subscribe(data => {
      this.snackBar.open('Concluinte encontrado, o formulario foi preenchido','',{
          duration: 5000
      });
      btn.disabled = false;
      this.student.birth_date = data[0].dt_nascimento;
      this.student.name = data[0].nome;
      this.student.distance_education = data[0].cursos[0].ead!="N"? 1: 0;
      this.student.regimental_gratuity = data[0].cursos[0]['gratuidade_regimental']!="N"? 1: 0;
      this.student.gender = data[0]['sexo']=="M"? 1: 2;
      this.setValues();
    },
    response => {
      if(response.status == 404){
        this.snackBar.open('Concluinte não encontrado','',{
          duration: 5000
        });
        btn.disabled = false;
      }
      console.log(response);
    });
  }
  setValues(){
    (<FormGroup>this.steps[0]).patchValue(this.student);
    (<FormGroup>this.steps[1]).patchValue(this.student);
    (<FormGroup>this.steps[2]).patchValue(this.student);
    (<FormGroup>this.steps[3]).patchValue(this.student);
    (<FormGroup>this.steps[4]).patchValue(this.student);
    setTimeout(()=>this.bugFixPlaceholder(), 200);
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
  getNumber(value){
    return value.replace(/[/ _)(.-]/g, '');
  }
  save() {
    if(!this.form.valid) return this.triedSend = true;
    this.canSave = false;


    var result,
    userValue = Object.assign(this.steps[0].value,this.steps[1].value,this.steps[2].value),
    answerValue = Object.assign(this.steps[3].value,this.steps[4].value);

    userValue.user_id=1;
    userValue.end_year = 2017;
    userValue.city_id = 2;
    userValue.f1 = true;
    delete userValue.state;

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

    if(userValue){
      let data = userValue['birth_date'].split('-');
      userValue['birth_date'] = data[2]+"/"+data[1]+"/"+data[0];
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
