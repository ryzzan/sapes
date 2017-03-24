import { StudentsService } from '../shared/students.service';
import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ProgressComponent } from '../../component/progress/progress.component';

import { AuthService } from './../../shared/auth.service';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  public getStudents = new EventEmitter<any>();

  user;
  title = "Avaliação do Concluinte";
  @ViewChild('inputSelectAll') inputSelectAll;
  public students:Array<any> = [];
  public selectedStudents:Array<any> = [];

  infoApi: any;
  isSearch = false;
  isLoading = false;

  sort = {
    order: "asc",
    field: "id"
  }

  querySearch:any = null;
  apiPage = 1;
  apiLimit = 5;
  errorMessage;
  public arrayPagination = [5,10,15,20,25,30,35,40,45,50];

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private authService: AuthService
  ) {
    this.studentsService.info.subscribe(info => {
      this.infoApi = info;
    });
    this.getStudents.debounceTime(400).subscribe( ()=> {
        this.getData();
    });

    this.authService.user.subscribe(user => {
      this.user = user;
    });
    
    this.authService.getUser();

    console.log(this.user);
  }

  ngOnInit():void {
    this.getStudents.emit();
  }

  changePage = p => {
    this.apiPage = p;
    this.getStudents.emit();
  }

  nextPreviousPage(action){
    this.apiPage += action;
    this.getStudents.emit();
  }

  changeLimit = l => {
    this.apiLimit = l;
    this.getStudents.emit();
  }

  changeSearch = (s) => {
    this.querySearch = s;
    this.getStudents.emit();
  }

  changeSortAndOrder = field => {
    if(this.sort.field == field){
      this.sort.order = this.sort.order == "asc" ? "desc" : "asc";
    }
    this.sort.field = field;
    this.getStudents.emit();
  }

  clearSearch(){
    this.isSearch = false;
    this.querySearch = null;
    this.getStudents.emit();
  }

  getData: any = (
    page = this.apiPage,
    limit = this.apiLimit,
    sort = this.sort,
    querySearch = this.querySearch
  ) => {
    this.isLoading = true;
    this.studentsService.getStudents({page, limit, sort, querySearch})
    .subscribe(
      apiResponse => {
        this.isLoading = false;
        if(apiResponse.length == 0 && this.apiPage > this.infoApi.last_page) {
          this.apiPage = this.infoApi.last_page;
          if(this.apiPage!=0){
            return this.getStudents.emit();
          }
        }
        this.students = this.students.map(student => {
          student['checked'] = false;
          return student;
        });
        this.apiPage = this.infoApi.current_page;
        this.selectedStudents = [];
        this.inputSelectAll.checked = false
        this.students = apiResponse;
      },
      error =>  this.errorMessage = <any>error
    );
  }

  toogleSelected(checked: boolean, student: any){
    student.checked = checked;
    this.selectedStudents = this.students.filter(
      student => student.checked
    );
    this.toogleInputSelectAll();
  }
  toogleInputSelectAll(){
    let allSelected = this.selectedStudents.length == this.students.length;
    if((allSelected) != this.inputSelectAll.checked){
      this.inputSelectAll.checked = allSelected;
    }
  }
  toogleSelectedAll(checked){
    for(let i = this.students.length-1; i >= 0 ; i--){
      this.students[i].checked = checked;
    }
    if(checked){
      return this.selectedStudents = this.students;
    }
    this.selectedStudents = [];
  }

  deleteStudents(){
    if (confirm("Você realmente quer excluir?")) {
      let qtdDeleted = 0,
      qtdErrorDeleted = 0,
      feedback = this.dialog.open(ProgressComponent, {
        disableClose: true
      });
      feedback.componentInstance.message = "Excluindo concluinte";
      feedback.componentInstance.progress = true;
      for(let i = this.selectedStudents.length-1; i>=0; i--){
        this.studentsService.deleteStudent(this.selectedStudents[i].id)
          .subscribe(
          ()=>{
            qtdDeleted++;
            if((qtdErrorDeleted + qtdDeleted)==this.selectedStudents.length){
              feedback.close();
              this.getStudents.emit();
              this.snackBar.open('Concluinte(s) excluido(s) com sucesso','',{
                duration: 5000
              });
            }
          },
          err => {
            qtdErrorDeleted++;
            if((qtdErrorDeleted + qtdDeleted)==this.selectedStudents.length){
              feedback.close();
              this.getStudents.emit();
              this.snackBar.open(`Apenas ${{qtdDeleted}} de ${{qtdErrorDeleted}} concluintes selecionados, foram deletados.`,'',{
                duration: 5000
              });
            }
          });
      }
    }
  }
  edit(id: any): any {
    return  this.router.navigate(['/students', id]);
  }

  view(id: any): any {
    return  this.router.navigate(['/students/view', id]);
  }
}
