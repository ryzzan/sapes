import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions  } from '@angular/http';
import { Student } from  './student';
import { bdInfo } from '../students-form/data';
import { ApiService } from './../../shared/api.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StudentsService{
  private students: Student[] = [];
  private url: string;
  info: any;
  constructor(private apiService:ApiService){
    this.apiService.init('fase-1');
    this.url = this.apiService.url;
    this.info = this.apiService.info;
  }
  private headers = new Headers({
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*'
  }); // ... Set content type to JSON
  // private options = new RequestOptions({ headers: this.headers,});
  private options = new RequestOptions({ headers: this.headers});

  getStudents(params){
    return this.apiService.getList(params);
  }

  getStudent(id){
    return this.apiService.http.get(this.getStudentUrl(id), this.options)
      .map(res => this.transformToForm(res.json()));
  }
  transformToApi(data){
    data.city_id = data.city_id.id;
    data.unit_id = data.unit_id.id;
    data.course_id = data.course_id.id;
    data.occupation_id = data.occupation_id.id;
    if(data.agreement == null){
      data.agreement = false;
    }
    if(!data.agreement){
      data.agreement_name = '';
    }
    if(data.regimental_gratuity == null){
      data.regimental_gratuity = false;
    }
    if(data.distance_education == null){
      data.distance_education = false;
    }
    if(typeof(data.disability_id) == "undefined"){
      data.disability_id = null;
    }
    if(typeof(data.distance_education) == "undefined"){
      data.distance_education = null;
    }

    if(typeof(data.pronatec_id) == "undefined"){
      data.pronatec_id = null;
    }
    return data;
  }
  transformToForm(data){
    data.city_id = data.city;
    data.unit_id = data.unit;
    data.course_id = data.course;
    data.occupation_id = data.occupation;
    return data;
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

  getCourseId(course_name){
    if(!course_name) return null;
    course_name = course_name.toLowerCase();
    let course = bdInfo.courses.filter(course =>
       course.description.toLowerCase() == course_name
    );
    if(course.length == 1){
      return course[0].id;
    }
  }

  getOccupationId(occupation_name){
    if(!occupation_name) return null;
    occupation_name = occupation_name.toLowerCase();
    let occupation = bdInfo.occupations.filter(occupation =>
       occupation.description.toLowerCase() == occupation_name
    );
    if(occupation.length == 1){
      return occupation[0].id;
    }
  }

  addStudent(student){
    return this.apiService.http.post(
      this.url,
      JSON.stringify(this.transformToApi(student)),
      this.options
    ).map(res => res.json());
  }

  updateStudent(student){
    return this.apiService.http.put(
      this.getStudentUrl(student.id),
      JSON.stringify(this.transformToApi(student)),
      this.options
    ).map(res => res.json());
  }

  deleteStudent(id){
    return this.apiService.http.delete(this.getStudentUrl(id), this.options)
      .map(res => res.json());
  }

  private getStudentUrl(id){
    return this.url + "/" + id;
  }

}
