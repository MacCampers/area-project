import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private afDB: AngularFireDatabase) { }

  getToken() {
    return this.afDB.database.ref('/user').once('value').then(function(DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateUserToken(param: any) {
    return this.afDB.object('/user').update({ jwTtoken: param });
  }

  updateUserTokenGoogle(param: any) {
    return this.afDB.object('/user').update({ Googletoken: param });
  }

  updateUserTokenTwitter(param: any) {
    return this.afDB.object('/user').update({ Twittertoken: param });
  }

  updateUserSecretTwitter(param: any) {
    return this.afDB.object('/user').update({ Twittersecret: param });
  }

  updateUserTokenFacebook(param: any) {
    return this.afDB.object('/user').update({ Facebooktoken: param });
  }

  updateUserAccesFacebook(param: any) {
    return this.afDB.object('/user').update({ facebookAcces: param });
  }

  updateUserTokenGithub(param: any) {
    return this.afDB.object('/user').update({ Githubtoken: param });
  }
  
  updateTokenPageFacebook(param: any) {
    return this.afDB.object('/user').update({ FacebookPage: param });
  }
  
  updateUserID(param: any) {
    return this.afDB.object('/user').update({ UserId: param });
  }

  updateIDPageFacebook(param: any) {
    return this.afDB.object('/user').update({ FacebookPageID: param });
  }
}
