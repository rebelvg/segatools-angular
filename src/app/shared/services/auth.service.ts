import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { isEmpty, get } from 'lodash';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private token: string = null;

  tokenUpdated = new Subject<string>();
  userUpdated = new Subject<{}>();

  constructor(private http: HttpClient, private notify: NotifierService) {
    const token = localStorage.getItem('token');

    if (token) {
      this.token = token;
    }
  }

  isAuthenticated() {
    return !!this.token;
  }

  hasUserData() {
    return !isEmpty(this.user);
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
    this.tokenUpdated.next(token);
  }

  unsetToken() {
    this.token = null;
    localStorage.removeItem('token');
    this.tokenUpdated.next(null);
  }

  setUser(user) {
    this.user = user;
  }

  unsetUser() {
    this.user = null;
  }

  isCurrentUser(id) {
    if (!this.hasUserData()) {
      return false;
    }

    return id === this.user._id;
  }

  isRole(role) {
    return get(this.user, 'personas', []).includes(role);
  }

  getToken() {
    return this.token || '';
  }

  fetchUser() {
    console.log('fetch user');

    const headers = new HttpHeaders().set('token', this.token);

    this.http
      .get('https://segatools-api.azurewebsites.net/users', {
        observe: 'body',
        responseType: 'json',
        headers
      })
      .subscribe(
        (response: { user: User }) => {
          this.user = response.user;
          this.userUpdated.next(this.user);
        },
        error => {
          console.log(error);
        }
      );
  }

  getUser() {
    console.log('get user');

    return this.user;
  }
}
