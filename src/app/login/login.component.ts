import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  $nextUser: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  callLoginAndSaveUserData() {
    // this.$nextUser.query
    this.authService.SigninWithGoogle();

  }

}
