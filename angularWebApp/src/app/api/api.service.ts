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

  sendFilters(filters, idImage) {
    console.log(filters);
    console.log(idImage);
    let queryParams;
    let body = filters;
    if (filters.length < 1) {
      queryParams = '';
    }else {
      queryParams = '?shops=' + filters;
    }
    let uri = 'http://localhost:3003/user/5b4249d390940a4cf732de34/image/' + idImage + queryParams;
    console.log(uri);
    return this.http.get(uri, httpOptions);
  }

  getRecentSearches () {
    return this.http.get('http://localhost:3003/user/5b4249d390940a4cf732de34/recentSearches/', httpOptions);
  }

  setFavorite (idImage) {
    console.warn(idImage);
    return this.http.put('http://localhost:3003/user/5b4249d390940a4cf732de34/image/' + idImage, httpOptions);
  }

  getFavorites () {
    return this.http.get('http://localhost:3003/user/5b4249d390940a4cf732de34/favoriteSearches', httpOptions);
  }

  getPopulars () {
    return this.http.get('http://localhost:3003/popularSearches', httpOptions);
  }

}
