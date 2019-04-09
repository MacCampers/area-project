import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../api/login.service'
import { InitService } from 'src/app/services/init.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  newUser = { username: '', password: '' };
  existingUser = { username: '', password: '' };
  error$: any;
  errorCreate$: any;

  constructor(public authService: AuthService, private router: Router, public loginService: LoginService, public init: InitService) { }


  ngOnInit() {
  }

  registerUser() {
    this.init.initServices();
    this.loginService.signUp(this.newUser);
    this.authService.register(this.newUser.username, this.newUser.password)
      .then(createdUser => {
        this.router.navigate(['emailSection']);
      })
      .catch(error => {
        this.errorCreate$ = error.message;
        console.log(error.message);
      })
  }

  loginUser() {
    this.loginService.login(this.existingUser);
    this.authService.login(this.existingUser.username, this.existingUser.password)
      .then(value => {
        this.router.navigate(['dashboard']);
      })
      .catch(err => {
        this.error$ = err.message;
        console.error('erreur :', err.message);
      })
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
      .then(() => this.router.navigate(['dashboard']));
  }

  signInWithFacebook(): void {
    this.authService.signInWithFacebook()
      .then(() => this.router.navigate(['dashboard']));
  }

  signInWithGithub(): void {
    this.authService.signInWithGithub()
      .then(() => this.router.navigate(['dashboard']));
  }

  signInWithTwitter(): void {
    this.authService.signInWithTwitter()
      .then(() => this.router.navigate(['dashboard']));
  }

}
