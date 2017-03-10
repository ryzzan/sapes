import { StudentsService } from '../shared/students.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  
  title = "Avaliação do Concluinte";

  public students:Array<any> = [];
  public selectedStudents:Array<any> = [];

  infoApi: any;
  isSearch = false;

  sort = {
    order: "asc",
    field: "id"
  }
  querySearch:any = null;
  apiPage = 1;
  apiLimit = 2;
  errorMessage;

  public arrayPagination = [2,5,10,15,20,25,30,35,40,45,50];

  teste(e){
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

  changeLimit = l => {
    this.apiLimit = l;
    this.getStudent();
  }

  changeSearch = s => {
    this.querySearch = s;
    this.getStudent();
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
    this.studentsService.getStudents({page, limit, sort, querySearch})
    .subscribe(
      apiResponse => {
        if(apiResponse.length == 0 && this.apiPage != 1) {
          this.apiPage = this.infoApi.last_page;
          return this.getStudent();
        }
        this.students = apiResponse;
      },
      error =>  this.errorMessage = <any>error
    );
  }
  toogleSelected(checked: boolean, student: any){
    if(checked){
      return this.selectedStudents.push(student.id);
    }
  }
  deleteStudent(student){
    // if (confirm("Are you sure you want to delete " + student.name + "?")) {


    //   this.studentsService.deleteStudent(student.id)
    //     .subscribe(
    //       ()=>{
    //         // this.onChangeTable(this.config);
    //       },
    //       err => {
    //         alert("Could not delete student.");
    //       // Revert the view back to its original state
    //       });
    //   }
  }
  edit(id: any): any {
    return  this.router.navigate(['/students', id]);
  }
}
