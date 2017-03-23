import { Injectable, EventEmitter } from '@angular/core';
import { Http,XHRBackend, RequestOptions, Headers, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { environment } from './../../environments/environment';

@Injectable()
export class ApiService{
  url = environment.urlToApi;
  info: EventEmitter<any> = new EventEmitter();
  constructor(public http:Http) {
  }
  init(service){
    this.url += service;
  }
  createOptions(){
    let header = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    token = sessionStorage.getItem('access_token');
    if(token){
      header.append('Authorization', "Bearer " + token);
    }
    let options = new RequestOptions({ headers: header});
    return options;
  }
  get(url) :  Observable<any> {
    let options = this.createOptions();
    return this.http.get(url,options)
      .distinctUntilChanged();
  }
  post(url, data) : Observable<any> {
    let options = this.createOptions();
    return this.http.post(url,data, options)
    .map(res => res.json());
  }
  put(url, data) : Observable<any> {
    let options = this.createOptions();
    return this.http.put(url,data, options)
    .map(res => res.json());
  }
  delete(url) : Observable<any> {
    let options = this.createOptions();
    return this.http.delete(url, options)
    .map(res => res.json());
  }
  getList(params):  Observable<any> {
    let options = this.createOptions();
    let url = this.url+"?";
    if(params.querySearch != null){
      url += "search="+params.querySearch+"&";
    }
    if(params.page != "") {
      url += "page="+params['page']+"&";
    }
    if(params.limit != "") {
      url += "limit="+params.limit+"&";
    }

    if(params.sort != "") {
      url += "order=" + params.sort.field + "," + params.sort.order + "&";
    }

    url = url.substring(0, url.length-1);
    
    return this.http.get(url,options)
                    .distinctUntilChanged()   // ignore if next search term is same as previous
                    .map(data => this.extractData(data))
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json(),
    info = {};
    info['current_page'] = body.current_page;
    info['from'] = body.from;
    info['to'] = body.to;
    info['last_page'] = body.last_page;
    info['next_page_url'] = body.next_page_url;
    info['per_page'] = body.per_page;
    info['prev_page_url'] = body.prev_page_url;
    info['total'] = body.total;
    this.info.emit(info);
    return body.data || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
