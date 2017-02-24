import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Student } from  './student';
import { bdInfo } from '../students-form/data';

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
  private url: string = "//sapesapi.nitrofull.com.br/api/fase-1";

  getStudents(){
    return this.http.get(this.url+"?noPaginete=true", this.options)
      .map(res => res.json());
  }

  getStudent(id){

    return this.http.get(this.getStudentUrl(id), this.options)
      .map(res => this.transformToForm(res.json()));
  }
  transformToApi(data){
    data.city_id = this.getCityId(data.city_id);
    data.unit_id = this.getUnitId(data.unit_id);
    if(data.agreement == null){
      data.agreement = false;
    }
    if(data.regimental_gratuity == null){
      data.regimental_gratuity = false;
    }
    if(data.distance_education == null){
      data.distance_education = false;
    }
    return data;
  }
  transformToForm(data){
    data.city_id = `${data.city.state} - ${data.city.description}`
    data.unit_id = data.unit.description;
    return data;
  }

  getCityId(city_name){
    if(!city_name) return null;
    city_name = city_name.toLowerCase();
    city_name = city_name.split(' - ');
    let city = bdInfo.cities.filter(city => {
      let valueForSearch = (city.state + " - " + city.description).toLowerCase().split(' - ')
      if(city_name.length == 1){
        return city_name[0] == valueForSearch[1];
      };
      return city_name[0] == valueForSearch[0] && city_name[1] == valueForSearch[1];
    });
    if(city.length == 1){
      return city[0].id;
    }
  }
  getUnitId(unit_name){
    if(!unit_name) return null;
    unit_name = unit_name.toLowerCase();
    let unit = bdInfo.units.filter(unit =>
       unit.description.toLowerCase() == unit_name
    );
    if(unit.length == 1){
      return unit[0].id;
    }
  }

  addStudent(student){
    return this.http.post(
      this.url,
      JSON.stringify(this.transformToApi(student)),
      this.options
    ).map(res => res.json());
  }

  updateStudent(student){
    return this.http.put(
      this.getStudentUrl(student.id),
      JSON.stringify(this.transformToApi(student)),
      this.options
    ).map(res => res.json());
  }

  deleteStudent(id){
    return this.http.delete(this.getStudentUrl(id), this.options)
      .map(res => res.json());
  }

  private getStudentUrl(id){
    return this.url + "/" + id;
  }

}
