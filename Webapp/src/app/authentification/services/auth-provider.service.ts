import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { TokenService } from 'src/app/api/token.service';
import { FacebookService } from 'src/app/facebook/facebook.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  user$: Observable<firebase.User>;
  tokenTwitter: any;
  tokenGoogle: any;
  tokenGithub: any;
  tokenFacebook: any;
  AccessFacebook: any;

  constructor(private angularfireAuth: AngularFireAuth, private token: TokenService, private fb: FacebookService) {
    this.user$ = angularfireAuth.authState;
  }

  async signInWithTwitter() {
    var provider = new firebase.auth.TwitterAuthProvider();
    return this.angularfireAuth.auth.currentUser.linkWithPopup(provider).then(data => {
      this.tokenTwitter = data.credential;
      this.token.updateUserTokenTwitter(this.tokenTwitter.accessToken);
      this.token.updateUserSecretTwitter(this.tokenTwitter.secret);
    });
  }

  async signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return this.angularfireAuth.auth.currentUser.linkWithPopup(provider).then(data => {
          this.tokenGoogle = data.credential;
          this.token.updateUserTokenGoogle(this.tokenGoogle.accessToken);
        });
  }

  async signInWithGithub() {
    var provider = new firebase.auth.GithubAuthProvider();
    return this.angularfireAuth.auth.currentUser.linkWithPopup(provider).then(data => {
        this.tokenGithub = data.credential;
        this.token.updateUserTokenGithub(this.tokenGithub.accessToken);
      });
  }

  async signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    return this.angularfireAuth.auth.currentUser.linkWithPopup(provider).then(data => {
        this.AccessFacebook = data.credential;
        this.tokenFacebook = data.additionalUserInfo;
        this.token.updateUserTokenFacebook(this.tokenFacebook.profile.id);
        this.token.updateUserAccesFacebook(this.AccessFacebook.accessToken);
        this.fb.getTokenPage(this.AccessFacebook.accessToken);
      });
  }
}
