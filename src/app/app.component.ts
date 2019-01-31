import { Component, OnInit } from '@angular/core';
import { MetaService } from './shared/services/meta.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Segatools-react';
  constructor(private meta: MetaService, private auth: AuthService) {}

  ngOnInit() {
    this.meta.fetchChapters();
    const token = this.auth.getToken();
    this.getUser(token);

    this.auth.tokenUpdated.subscribe(updatedToken => {
      this.getUser(updatedToken);
    });
  }

  getUser(token) {
    if (token) {
      this.auth.fetchUser();
    }
  }
}
