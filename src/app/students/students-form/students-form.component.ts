import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

import { Student } from '../shared/student';
import { CorporateService } from '../../shared/corporate.service';
import { StudentsService } from '../shared/students.service';
import { AuthService } from './../../shared/auth.service';

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
  user;
  @ViewChild('remunerado') flagRemunerado;
  
  checkedRemunerado;
  title: string;
  form: FormGroup;
  student: Student = new Student();
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
  filteredUnits:any;
  filteredCourses:any;
  filteredCities:any;
  filteredOccupations:any;
  filteredRegional:any;
  steps: any = [];

  checkIfUpdating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public snackBar: MdSnackBar,
    private corporateService: CorporateService,
    public dialog: MdDialog,
    private authService: AuthService
  ) {
    this.bdInfo = bdInfo;
    this.filteredRegional = this.bdInfo.regionals;
    this.authService.user.subscribe(user => {
      this.user = user;
      if(this.user.profile[0].permission_filter!=""){
        this.filteredRegional = this.bdInfo.regionals.filter( regional =>
          regional.sigla == user.regional
        );
        if(this.user.profile[0].permission_filter=="UNIT"){
          this.bdInfo.units = this.bdInfo.units.filter( unit =>
            unit.id == user.unit_id
          );
          console.log(this.bdInfo.units);
        }
      }

    });
    this.authService.getUser();


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
      .map(city => this.filterGeneric(city, 'cities'));

    this.filteredUnits = this.steps[1].controls['unit_id'].valueChanges
      .startWith(null)
      .map(unit => this.filterUnits(unit));

    this.filteredCourses = this.steps[1].controls['course_id'].valueChanges
      .startWith(null)
      .map(course => this.filterGeneric(course, 'courses'));

    this.filteredOccupations = this.steps[1].controls['occupation_id'].valueChanges
      .startWith(null)
      .map(occupation => this.filterGeneric(occupation, 'occupations'));
  }

  ngOnInit() {
    this.form.reset();
    this.checkedRemunerado = true;
    this.changePronatecModalities(false);

    var id = this.route.params.subscribe(params => {
    var id = params['id'];

    this.title = id ? 'Editar Concluinte' : 'Novo Concluinte';

    this.checkIfUpdating = true;

    if (!id) {
      this.checkIfUpdating = false;

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
  changeRemunerado(){
    if(this.flagRemunerado.checked){
      this.steps[3].controls[1].patchValue({'alternative_id': null});
      this.steps[3].controls[2].patchValue({'alternative_id': null});
    } else {
      this.steps[3].controls[1].patchValue({'alternative_id': 35});
      this.steps[3].controls[2].patchValue({'alternative_id': 36});
    }
  }
  filterGeneric(val, bdInfoIndex){
    if(!val) return [];
    if(typeof val != "string"){
      val = val.description;
    }

    val = this.replaceSpecialChars(val);

    let selecteds = this.bdInfo[bdInfoIndex].filter((selected) => {
      let forSearch = '';
      if(bdInfoIndex == "occupations"){
        forSearch += selected.code + " "
      }
      forSearch += selected.description;
      forSearch = this.replaceSpecialChars(forSearch);
      return new RegExp(val, 'gi').test(forSearch);
    });
    return selecteds.length>100 && val.length<3 ? [] : selecteds;
  }

  filterUnits(val:any) {
    if(!val) return [];
    if(typeof val != "string"){
      val = val.description;
    }
    val = this.replaceSpecialChars(val);
    let selecteds = this.bdInfo.units.filter((unit) => {
      if(this.steps[1].controls['regional'].value){
        return unit.regional == this.steps[1].controls['regional'].value &&
        new RegExp(val, 'gi').test(this.replaceSpecialChars(unit.description));
      }
      return new RegExp(val, 'gi').test(this.replaceSpecialChars(unit.description));
    });
    return selecteds.length>100 && val.length<3 ? [] : selecteds;

  }
  replaceSpecialChars(str)
  {
      str = str.replace(/[ÀÁÂÃÄÅ]/gi,"A");
      str = str.replace(/[òóõô]/gi,"O");
      str = str.replace(/[ìí]/gi,"i");
      str = str.replace(/[ÈÉÊË]/gi,"E");
      str = str.replace(/[Ç]/gi,"C");

      // o resto

      return str.replace(/[^ a-z0-9]/gi,'');
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
  displayAutocomplete(value){
    return value ? value.description:value;
  }
  getStudentIntegratedBase(value, btnSearch){

    if(!this.steps[0].controls['cpf_number'].valid) return false;
    btnSearch.disabled = true;

    let feedback = this.dialog.open(ProgressComponent, {
      disableClose: true
    });
    feedback.componentInstance.message = "Buscando concluinte";
    feedback.componentInstance.progress = true;

    value = value.replace(/[/ _)(.-]/g, '');
    this.corporateService.getStudent(value).subscribe(data => {
      feedback.close();
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
      if(btnSearch){
        btnSearch.disabled = false;
      }
      return this.setValueFromIntegratedBase(student, student.courses[0]);
    },
    response => {
      feedback.close();
      let msgError = 'Algo inesperado ocorreu, tente novamente ou entre em contato com o responsável pelo sistema.';
      if(response.status == 404){
        msgError = 'Concluinte não encontrado';
      }
      this.snackBar.open(msgError,'',{
        duration: 5000
      });
      btnSearch.disabled = false;
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
      if(btn){
        btn.disabled = false;
      }
      if(typeof(courseSelected) != "undefined"){
        return this.setValueFromIntegratedBase(data, courseSelected);
      }
      return this.snackBar.open('Operação de busca cancelada pelo usuário','',{
          duration: 5000
      });
    });
  }

  setValueFromIntegratedBase(data, course){
      this.form.reset();
      let student = Object.assign(data, course);
      delete student.courses;
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
    this.changePronatecValue(this.steps[1].controls['pronatec_id'].value>0);
  }
  changedTabIndex(event){
    this.formPagination.index = event.index;
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
    userValue.user_id=this.user.id;
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
      this.router.navigate(['students']);
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
