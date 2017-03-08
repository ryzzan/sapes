import { StudentsService } from '../shared/students.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { TableData } from './table-data';
// import


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  public students:Array<any> = [];
  public columns:Array<any> = [
    {title: 'COD', name: 'id', sort: false},
    {title: 'Nome', name: 'name'},
    {title: 'Unidade',name: 'unit.description',sort: 'asc'},
    {title: 'Modalidade',name: 'modality.description',sort: 'asc'},
    {title: 'Curso',name: 'course.description',sort: 'asc'},
    {title: 'Turma',name: 'course.description',sort: 'asc'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public arrayPagination = [5,10,15,20,25,30,35,40,45,50];

  teste(e){
    console.log(e);
  }

  public constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {

  }

  deleteStudent(student){
    if (confirm("Are you sure you want to delete " + student.name + "?")) {


      this.studentsService.deleteStudent(student.id)
        .subscribe(
          ()=>{
            // this.onChangeTable(this.config);
          },
          err => {
            alert("Could not delete student.");
          // Revert the view back to its original state
          });
      }
  }
  public ngOnInit():void {
    this.studentsService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  public edit(id: any): any {
    // console.log(data);
    // if(data.column == "excluir"){
    //   return this.deleteStudent(data.row);
    // }
    return  this.router.navigate(['/students', id]);

  }

}
