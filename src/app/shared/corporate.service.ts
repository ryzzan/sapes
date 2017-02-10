import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CorporateService {
  private data;
  constructor(private http: Http) {}

  //Novo
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private options = new RequestOptions({ headers: this.headers });

  private url: string = "http://portalh4.sistemaindustria.org.br:9080/api-autenticacao/oauth2/token";

  getData(){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'client_credentials');
    urlSearchParams.append('client_id', 'U0lTQVBTMjMxMDIwMTcxNTI3');
    urlSearchParams.append('client_secret', 'U0lTQVBTc2VjcmV0MjMxMDIwMTcxNTI3',);

    let body = urlSearchParams.toString();
    return this.http.post(this.url, body, this.options).map(res => res.json());
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
