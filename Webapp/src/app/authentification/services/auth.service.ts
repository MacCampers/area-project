import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { TokenService } from 'src/app/api/token.service';
import { FacebookService } from 'src/app/facebook/facebook.service';
import { GithubService } from 'src/app/github/github.service';
import { TwitchService } from 'src/app/twitch/twitch.service';
import { InitService } from 'src/app/services/init.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  tokenGoogle: any;
  tokenGithub: any;
  tokenFacebook: any;
  AccessFacebook: any;
  tokenTwitter: any;
  secretTwitter: any;

  constructor(private angularfireAuth: AngularFireAuth, private token: TokenService) {
    this.user$ = angularfireAuth.authState;
  }

  setRegister() {
    
  }

  register(email: string, password: string) {
    this.token.updateUserAccesFacebook(0);
    this.token.updateUserSecretTwitter(0);
    this.token.updateUserTokenFacebook(0);
    this.token.updateUserTokenGithub(0);
    this.token.updateUserTokenGoogle(0);
    this.token.updateUserTokenTwitter(0);
    return this.angularfireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  registerLink(email: string, password: string) {
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    
    return this.angularfireAuth.auth.currentUser.linkWithCredential(credential).then(function(usercred) {
      console.log("Account linking success");
    }, function(error) {
      console.log("Account linking error", error);
    });
  }

  login(email: string, password: string) {
    return this.angularfireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  updatePassword(email) {
    //  this.angularfireAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this.angularfireAuth.auth.signOut();
  }

  sendEmailVerification() {
    const user = firebase.auth().currentUser;
    if (user) {
      user.sendEmailVerification();
    }
  }

  signIn(provider: firebase.auth.AuthProvider) {
    return this.angularfireAuth.auth.signInWithPopup(provider);
  }

  async signInWithGoogle() {
    return this.signIn(new firebase.auth.GoogleAuthProvider())
      .then(
        data => {
          console.log(data);
          this.tokenGoogle = data.credential;
          this.token.updateUserTokenGoogle(this.tokenGoogle.accessToken);
        });
  }

  async signInWithTwitter() {
    return this.signIn(new firebase.auth.TwitterAuthProvider()).then(
      data => {
        this.tokenTwitter = data.credential;
        this.token.updateUserTokenTwitter(this.tokenTwitter.accessToken);
        this.token.updateUserSecretTwitter(this.tokenTwitter.secret);
      });
  }

  async signInWithGithub() {
    return this.signIn(new firebase.auth.GithubAuthProvider()).then(
      data => {
        this.tokenGithub = data.credential;
        this.token.updateUserTokenGithub(this.tokenGithub.accessToken);
      });
  }

  async signInWithFacebook() {
    return this.signIn(new firebase.auth.FacebookAuthProvider()).then(
      data => {
        console.log(data);
        this.AccessFacebook = data.credential;
        this.tokenFacebook = data.additionalUserInfo;
        this.token.updateUserTokenFacebook(this.tokenFacebook.profile.id);
        this.token.updateUserAccesFacebook(this.AccessFacebook.accessToken);
      });
  }
}
