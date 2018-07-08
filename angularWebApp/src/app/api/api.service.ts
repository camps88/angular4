import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  uploadImage(imageBase64) {
    let body = imageBase64;
    return this.http.post('http://localhost:3003/user/5b4249d390940a4cf732de34/image', body, httpOptions);
  }
}
