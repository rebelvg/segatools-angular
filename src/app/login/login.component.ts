import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
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

      if (queryToken) {
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
    location.href = 'https://segatools-api.azurewebsites.net/api/users/auth/google';
  }
}
