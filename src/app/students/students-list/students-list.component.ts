import { StudentsService } from '../shared/students.service';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

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
  }

  ngOnInit():void {
    this.getStudent();
  }

  changePage = p => {
    this.apiPage = p;
    this.getStudent();
  }

  nextPreviousPage(action){
    this.apiPage += action;
    console.log(this.apiPage);
    this.getStudent();
  }

  changeLimit = l => {
    this.apiLimit = l;
    this.getStudent();
  }

  changeSearch = s => {
    this.querySearch = s;
    this.getStudent();
  }

  clearSearch(){
    this.isSearch = false;
    this.querySearch = null;
    this.getStudent();
  }
  enableSearch(input){

    this.isSearch = true;
    // input.focus();
  }

  changeSortAndOrder = field => {
    if(this.sort.field == field){
      this.sort.order = this.sort.order == "asc" ? "desc" : "asc";
    }
    this.sort.field = field;
    this.getStudent();
  }

  getStudent = (
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
          return this.getStudent();
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
              this.getStudent();
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
