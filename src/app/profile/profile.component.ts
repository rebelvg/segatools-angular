import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user = <User>this.auth.getUser();
    this.auth.userUpdated.subscribe((user: User) => {
      this.user = user;

      console.log(this.user);
    });
  }
}
