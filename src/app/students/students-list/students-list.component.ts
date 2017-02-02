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

  public editClick(row: any) {
    alert("editou");
      // this.eventService.editRow(row);
  }

  public viewClick(row: any) {
      // this.eventService.viewRow(row);
  }

  public linkClick(row: any, col: any) {
      // this.eventService.linkClick(row);
  }
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'id', name: 'id', sort: false},
    {
      title: 'Nome',
      name: 'name',
      filtering: {filterString: '', placeholder: 'Buscar por nome'}
    },
    {
      title: 'Email',
      className: ['office-header'],
      name: 'email',
      sort: 'asc',
      filtering: { placeholder: 'Buscar por e-mail'}
    },
    {
      title: '',
      name: 'editar',
      sort: false,
      className: ['actions']
    },
    {
      title: '',
      name: 'excluir',
      sort: false,
      className: ['actions']
    }
  ];
  public page:number = 1;
  public itemsPerPage:number = 2;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public arrayPagination = [0,5,10,15,20,25,30,35,40,45,50];

  teste(e){
    console.log(e);
  }

  changeNumberPerPage(index){
    this.itemsPerPage = index;
    this.onChangeTable(this.config);
  }

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['dataTable']
  };

  private data:Array<any> = [];

  public constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {
    this.length = this.data.length;
  }

  deleteStudent(student){
    if (confirm("Are you sure you want to delete " + student.name + "?")) {
      var index = this.data.indexOf(student);
      this.data.splice(index, 1);

      this.studentsService.deleteStudent(student.id)
        .subscribe(
          ()=>{
            this.length = this.data.length;
            this.onChangeTable(this.config);
          },
          err => {
            alert("Could not delete student.");
            // Revert the view back to its original state
            this.data.splice(index, 0, student);
          });
      }
  }
  public ngOnInit():void {
    console.log(this.data);
    this.onChangeTable(this.config);
    this.studentsService.getList().subscribe(students => {

      this.data = students.data;
      students.data.forEach(value => {
        value.excluir = `<a md-raised-button routerLink="excluir">Excluir</a>`;
        value.editar = `<a md-raised-button routerLink="edit">Editar</a>`;
      })
      this.length = students.total;
      this.onChangeTable(this.config);
   });
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          if(typeof(column.filtering.filterString)==="undefined") return true;
          return item[column.name].toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if(item[column.name] != null){
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
    if(data.column == "excluir"){
      return this.deleteStudent(data.row);
    }
    if(data.column == "editar"){
      return  this.router.navigate(['/students', data.row.id]);
    }

  }

}
