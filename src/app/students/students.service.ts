import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

@Injectable()
export class StudentsService {
  private students: any[] = [];
  getStudents(){
    return this.students
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  getList(){
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });
    return this.http.get('http://10.83.3.190:81/api/students?noPaginete=1',options).map(res => res.json());
  }
  constructor(private http: Http) {}

}
