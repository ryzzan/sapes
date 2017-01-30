import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Student } from  './student';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  getList(){
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });
    return this.http.get(this.url,options).map(res => res.json());
  }
  constructor(private http: Http) {}

  //Novo
  private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}); // ... Set content type to JSON
  private options = new RequestOptions({ headers: this.headers });
  private url: string = "http://sapesapi.nitrofull.com.br/api/students";

  getStudents(){
    return this.http.get(this.url, this.options)
      .map(res => res.json());
  }

  getStudent(id){

    return this.http.get(this.getStudentUrl(id), this.options)
      .map(res => res.json());
  }

  addStudent(student){
    return this.http.post(this.url, JSON.stringify(student), this.options)
      .map(res => res.json());
  }

  updateStudent(student){
    return this.http.put(this.getStudentUrl(student.id), JSON.stringify(student), this.options)
      .map(res => res.json());
  }

  deleteStudent(id){
    return this.http.delete(this.getStudentUrl(id), this.options)
      .map(res => res.json());
  }

  private getStudentUrl(id){
    return this.url + "/" + id;
  }

}
