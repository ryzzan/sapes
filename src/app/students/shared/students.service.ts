import { Injectable } from '@angular/core';
import { Headers, RequestOptions  } from '@angular/http';
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

  getStudents(params){
    return this.apiService.getList(params);
  }

  getStudent(id){
    return this.apiService.get(this.getStudentUrl(id))
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

  addStudent(student){
    return this.apiService.post(
      this.url,
      JSON.stringify(this.transformToApi(student))
    );
  }

  updateStudent(student){
    return this.apiService.put(
      this.getStudentUrl(student.id),
      JSON.stringify(this.transformToApi(student)),
    );
  }

  deleteStudent(id){
    return this.apiService.delete(this.getStudentUrl(id));
  }

  private getStudentUrl(id){
    return this.url + "/" + id;
  }

}
