import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  usersUpdated = new Subject<User[]>();
  users: User[];
  constructor() {}

  setUsers(users) {
    this.users = users;
    this.usersUpdated.next(this.users);
  }

  getUsers() {
    return this.users;
  }
}
