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

  private url: string = "http://portalh4.sistemaindustria.org.br:9080/";

  getToken(){
    let token = sessionStorage.getItem('token');
    if(!token){
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('grant_type', 'client_credentials');
      urlSearchParams.append('client_id', 'U0lTQVBTMjMxMDIwMTcxNTI3');
      urlSearchParams.append('client_secret', 'U0lTQVBTc2VjcmV0MjMxMDIwMTcxNTI3');

      let body = urlSearchParams.toString();

      this.http.post(this.url + "api-autenticacao/oauth2/token", body, this.options).map(res => res.json()).subscribe( data =>{
        sessionStorage.setItem('token', JSON.stringify(data));
      },
      response => {

      });
    }
  }

  getStudent(identification){
    let token = JSON.parse(sessionStorage.getItem('token'));
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token.token_type + " " + token.access_token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStudentUrl(identification,'DN'), options)
      .map(res => res.json());
  }
  Interceptor(data){
    data = data.map(student => ({
      birth_date: student.dt_nascimento,
      name: student.nome,
      gender: student['sexo']=="M"? 1: 2,
      base_id: student.cd_pessoa,
      cursos: student.cursos.map(curso => ({
        distance_education: curso.ead!="N"? 1: 0,
        regimental_gratuity: curso['gratuidade_regimental']!="N"? 1: 0,
      }))
    }))
    return data;
  }
  teste(identification){
    let token = JSON.parse(sessionStorage.getItem('token'));
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token.token_type + " " + token.access_token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getStudentUrl('PEDRO VICENTE','DN'), options)
      .map(res => this.Interceptor(res.json()));
  }

  private getStudentUrl(identification, dr){
    return this.url + "api-basi/v1/epmat/dr/"+dr+"/alunos/" + identification;
  }

}
