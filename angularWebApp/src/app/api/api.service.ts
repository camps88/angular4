import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  uploadImage() {
    let body = {
      imageUri: 'gs://gapbbdd/camiseta2.jpg'
    }
    return this.http.post('http://localhost:3003/image', body, httpOptions);
  }
}
