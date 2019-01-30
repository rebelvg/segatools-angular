import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(query => {
      const queryToken = query.token;
      const token = this.auth.getToken();
      if (token) {
        return this.redirectToMain();
      }

      if (queryToken && !token) {
        this.auth.setToken(queryToken);
        return this.redirectToMain();
      }

      this.redirectToLogin();
    });
  }

  redirectToMain() {
    this.auth.fetchUser();
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    location.href = '/api/users/auth/google';
  }
}
