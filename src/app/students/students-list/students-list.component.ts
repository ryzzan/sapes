import { StudentsService } from '../shared/students.service';
import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public getStudents = new EventEmitter<any>();

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

  teste(e){
    console.log(e);
  }

  constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {
    this.studentsService.info.subscribe(info => {
      this.infoApi = info;
    });
    this.getStudents.debounceTime(400).subscribe( ()=> {
        this.getData();
    });
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
    console.log(this.apiPage);
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
          return this.getStudents.emit();
        }
        this.students = this.students.map(student => {
          student['checked'] = false;
          return student;
        });
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
      let qtdDeleted = 0;
      for(let i = this.selectedStudents.length-1; i>=0; i--){
        this.studentsService.deleteStudent(this.selectedStudents[i].id)
          .subscribe(
          ()=>{
            qtdDeleted++;
            if(qtdDeleted==this.selectedStudents.length){
              alert("finished");
              this.getStudents.emit();
            }
          },
          err => {
            alert("Could not delete student.");
          // Revert the view back to its original state
          });
      }
    }
  }
  edit(id: any): any {
    return  this.router.navigate(['/students', id]);
  }
}
