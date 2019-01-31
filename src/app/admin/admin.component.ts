import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AdminService } from './admin.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];
  constructor(private data: DataService, private admin: AdminService, private auth: AuthService) {}

  ngOnInit() {
    this.users = this.admin.getUsers();
    this.data.fetchUsers();
    this.admin.usersUpdated.subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }
}
