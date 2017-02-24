import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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

import 'rxjs/add/operator/startWith';

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
    cell_phone: ['(', /\d/, /\d/, ')',' ' , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/,]
  };
  modalities: any;
  units: any = bdInfo.units;
  formPagination: any = {
    maxIndex: 4,
    index: 0
  };
  autoCorrectedDatePipe = autoCorrectedDatePipe;
  triedSend: boolean = false;
  canSave: boolean = false;
  bdInfo : any = {};
  filteredCities:any;
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
    this.form = this.formBuilder.group({
      aluno: this.steps[0],
      curso: this.steps[1],
      contato: this.steps[2],
      situacao: this.steps[3],
      avaliacao: this.steps[4]
    });
    this.filteredCities = this.steps[2].controls['city_id'].valueChanges
      .startWith(null)
      .map(city => this.filterCities(city));
  }

  ngOnInit() {
    this.form.reset();
    this.changePronatecModalities(false);

    var id = this.route.params.subscribe(params => {
    var id = params['id'];

    this.title = id ? 'Editar Concluinte' : 'Novo Concluinte';
    if (!id) {
      return this.canSave = true;
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

  filterCities(val: string) {
    if(!val) return [];
    if(val.length<2) return [];
    return this.bdInfo.cities.filter((city) => new RegExp(val, 'gi').test(city.description));
  }

  changePronatecModalities(checked) {
    let value = this.steps[1].controls['modality_id'].value;
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

  getStudentIntegratedBase(value, btnSearch){

    if(!this.steps[0].controls['cpf_number'].valid) return false;
    btnSearch.disabled = true;

    let feedback = this.snackBar.openFromComponent(ProgressComponent);
    feedback.instance.message = "Buscando concluinte";
    feedback.instance.progress = true;

    value = this.getNumber(value);
    this.corporateService.getStudent(value).subscribe(data => {
      data = data.filter(student => student.courses.length > 0);

      let student = data[0];
      if(student.courses.length == 0) {
        return this.snackBar.open('Concluinte encontrado, porém sem curso vinculado','',{
          duration: 5000
        });
      }
      if(student.courses.length != 1) {
        return this.chooseCourse(student, btnSearch);
      }

      return this.setValueFromIntegratedBase(student, btnSearch, student.courses[0]);
    },
    response => {
      if(response.status == 404){
        this.snackBar.open('Concluinte não encontrado','',{
          duration: 5000
        });
        btnSearch.disabled = false;
      }
      console.log(response);
    });
  }

  chooseCourse(data, btn){

    let dialogRef = this.dialog.open(SelectCourseComponent);
    dialogRef.componentInstance.ref = dialogRef;
    dialogRef.componentInstance.info = {
      name: data.name,
      cpf_number: data.cpf_number
    }
    dialogRef.componentInstance.courses = data.courses;
    dialogRef.afterClosed().subscribe(courseSelected => {
      if(typeof(courseSelected) != "undefined")
        this.setValueFromIntegratedBase(data, btn, courseSelected);
    });
  }

  setValueFromIntegratedBase(data, btn, course){
      this.form.reset();
      let student = Object.assign(data, course);
      delete student.courses;
      if(btn){
        btn.disabled = false;
      }
      console.log(student);
      this.student = student;
      this.setValues();
      this.snackBar.open('Concluinte encontrado, o formulario foi preenchido','',{
          duration: 5000
      });
  }
  setValues(){
    (<FormGroup>this.steps[0]).patchValue(this.student);
    (<FormGroup>this.steps[1]).patchValue(this.student);
    (<FormGroup>this.steps[2]).patchValue(this.student);
    if(typeof(this.student.answers) != 'undefined' && this.student.answers!=null){
      let questionOne = this.student.answers.filter(answer => answer.question_id*1 == 1).map(answer => {
        answer.alternative_flag = answer.alternative_id == 1;
        return answer;
      }),
      questionTwo = this.student.answers.filter(answer => answer.question_id*1 == 2),
      questionThree = this.student.answers.filter(answer => answer.question_id*1 == 3);

      (<FormArray>this.steps[3]).patchValue([
        questionOne.length > 0 ? questionOne[0] : {alternative_id: false},
        questionTwo.length > 0 ? questionTwo[0] : {alternative_id: null},
        questionThree.length > 0 ? questionThree[0] : {alternative_id: null},
      ]);
      let questionFour = this.student.answers.filter(answer => answer.question_id*1 == 4);
      (<FormGroup>this.steps[4]).patchValue([
        questionFour.length > 0 ? questionFour[0] : {alternative_id: null},
      ]);

    }
    this.changeUnit();
  }
  changedTabIndex(event){
    this.formPagination.index = event.index;
  }

  getNumber(value){
    return value.replace(/[/ _)(.-]/g, '');
  }
  save() {
    if(!this.form.valid) return this.triedSend = true;
    this.canSave = false;

    var result,
    userValue = Object.assign(this.steps[0].value,this.steps[1].value,this.steps[2].value);
    userValue.answers = this.steps[3].value.concat(this.steps[4].value);
    userValue.answers.forEach( (answer, index) => {
      if(this.student.answers){
        let id = this.student.answers.filter(answer =>
          answer.question_id == index + 1
        );
        if(typeof(id[0])!="undefined"){
          answer.id = id[0]['id'];
        }
      }
      if(typeof(answer.alternative_flag)!="undefined"){
        answer.alternative_id = answer.alternative_flag ? 1 : 2;
        delete answer.alternative_flag;
      }
      answer.phase = 1;
      answer.question_id = index + 1;
    });
    userValue.user_id=1;
    userValue.end_year = 2017;
    userValue.f1 = true;

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

  changeUnit(){
    let value = this.steps[1].controls['regional'].value;
    this.units = bdInfo.units.filter(unit => {
      return unit.regional == value
    })
  }
}
