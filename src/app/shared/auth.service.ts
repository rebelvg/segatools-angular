import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: {};
  private token: string;

  tokenUpdated = new Subject<string>();
  userUpdated = new Subject<{}>();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token;
  }

  fetchUser() {
    const headers = new HttpHeaders().set('token', this.token);
    this.http
      .get('/api/users', {
        observe: 'body',
        responseType: 'json',
        headers
      })
      .subscribe(response => {
        console.log(response);
        this.user = response;
      });
  }

  getUser() {
    return this.user;
  }
}
