import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

import { Student } from '../shared/student';
import { CorporateService } from '../../shared/corporate.service';
import { StudentsService } from '../shared/students.service';

import { Controls } from './form-control';
import { bdInfo } from './data';

import { ProgressComponent } from '../../component/progress/progress.component';
import { SelectCourseComponent } from '../select-course/select-course.component';

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
  modalities: any;
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
    private corporateService: CorporateService,
    public dialog: MdDialog
  ) {
    this.bdInfo = bdInfo;
    this.steps = Controls;
    this.steps[3] = this.formBuilder.group({
      question_4_1: [null],
      question_4_2: [null, [Validators.required]],
      question_4_3: [null, [Validators.required]]
    });

    this.steps[4] = this.formBuilder.group({
      question_5_1: [null, [Validators.required]]
    });
  }
  teste(event){
    console.log(event);
  }
  changePronatecModalities(checked) {
    let value = this.steps[1].controls['modality_id'].value;
    console.log(checked);
    this.modalities = bdInfo.modalities.filter(modality => {
      if ((modality.id == 2 || modality.id == 3) && checked) return false;
      return true;
    });
    if (checked && (value == 2 || value == 3)) {
      this.steps[1].patchValue({
        modality_id: null
      })
    }
  }
  changePronatecValue(checked){
    this.changeDisabled(this.steps[1], 'pronatec_id', checked);
    this.changePronatecModalities(checked);
    if(checked){
      this.steps[1].patchValue({
        regimental_gratuity: false
      });
    }
  }
  changeGratuity(checked, pronatec){
    console.log(pronatec);
    if (checked) {
      pronatec.checked = false;
      this.changePronatecValue(false);
    }
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
    this.dialog.open(SelectCourseComponent);
    this.changePronatecModalities(false);

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
  openSelectCourse(data){

  }
  getCorporateValue(value, btn){
    if(!this.steps[0].controls['cpf_number'].valid) return false;
    btn.disabled = true;
    let feedback = this.snackBar.openFromComponent(ProgressComponent);
    feedback.instance.message = "Buscando concluinte";
    feedback.instance.progress = true;
    value = this.getNumber(value);
    this.corporateService.getStudent(value).subscribe(data => {
      if(data[0].courses.length == 0) return this.snackBar.open('Concluinte encontrado, porém sem curso vinculado','',{
        duration: 5000
      });
      // if(data[0].courses.length != 1) return this.openSelectCourse(data);
      this.snackBar.open('Concluinte encontrado, o formulario foi preenchido','',{
          duration: 5000
      });
      let student = Object.assign(data[0], data[0].courses[0]);
      delete student.courses;
      btn.disabled = false;
      this.student = student;
      console.log(student);
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
