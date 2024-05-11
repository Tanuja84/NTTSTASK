import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  users() {
    return this.http.get(this.url)
  }

  submitRegistration(formData: any) {
    return this.http.post(this.url + 'users', formData);
  }

  getUserData() {
    return this.http.get(this.url + 'users');
  }

}
