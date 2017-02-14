import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { bdInfo } from '../students/students-form/data'

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
      .map(res => this.Interceptor(res.json()));
  }

  private dateForCourse(date, indice){
    if(date == null) return date;
    return parseInt(date.split("/")[indice]);
  }

  private captureCity(nameCity, uf){
    bdInfo.cities.filter(city => {
      city.description == nameCity && city.state == uf
    });
  }

  private Interceptor(data){
    data = data.map(student => ({
      base_id: student.cd_pessoa,
      name: student.nome,
      birth_date: student.dt_nascimento,
      gender: student['sexo'],
      ethnicity_id: student.cd_raca_cor == null ? null : bdInfo.ethnicities.filter(
          ethnicity => ethnicity.code == student.cd_raca_cor
      ),
      disability_id: student.cd_necessidade_especial == null ? null : bdInfo.disabilities.filter(
          disability => disability.code == student.cd_necessidade_especial
      ),
      address: student.endereco,
      address_zip_code: student.cep,
      address_number: student.numero,
      address_complement: student.complement,
      address_district: student.bairro,
      rg_number: student.rg_numero,
      city_id: this.captureCity(student.cidade, student.uf),
      cell_phone: student.celular_num == null ? null : student.celular_ddd + "" + student.celular_num,
      home_phone: student.telefone_num == null ? null : student.telefone_ddd + "" + student.telefone_num,
      //Filter for curse with situacao == 2
      courses: student.cursos.filter(curso => curso.cd_situacao == 2).map(curso => ({
        regional: curso.dr,
        unit_id: curso.cd_unidade == null ? null : bdInfo.units.filter(
          unit => unit.code == curso.cd_unidade
        ),
        origin_id: curso.cd_escola_orig_aluno_no_curso == null ? null : bdInfo.origins.filter(
          origin => origin.id == curso.cd_escola_orig_aluno_no_curso
        ),
        modality_id: curso.cd_modalidade,
        distance_education: curso.ead!="N"? 1: 0,
        regimental_gratuity: curso['gratuidade_regimental']!="N"? 1: 0,
        occupation_id: curso.cd_ocupacao == null ? null : bdInfo.occupations.filter(
          occupation => occupation.code == curso.cd_ocupacao
        ),
        area_id: curso.cd_area_atuacao == null ? null : bdInfo.areas.filter(
          area => area.code == curso.cd_area_atuacao
        ),
        start_month: this.dateForCourse(curso.dt_inicio, 1),
        start_year: this.dateForCourse(curso.dt_inicio, 2),
        end_month: this.dateForCourse(curso.dt_termino, 1),
        end_year: this.dateForCourse(curso.dt_termino, 2)
      }))
    }))
    return data;
  }

  private getStudentUrl(identification, dr){
    return this.url + "api-basi/v1/epmat/dr/"+dr+"/alunos/" + identification;
  }

}
