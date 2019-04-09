import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../api/token.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  ApiKeyFB = "315917889043302";
  ApiSecretFB = "11c54a6a111798ae3087fd67717e5a44";
  tokenPage: any;

  constructor(private afDB: AngularFireDatabase, private httpClient: HttpClient, private tokenService: TokenService, private apiservice: ApiService) { }

  getFacebookDatabase() {
    return this.afDB.database.ref('/widget/facebook').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param: any) {
    return this.afDB.object('/widget/facebook').update({ isActive: param });
  }

  updateTrigger1(param: any) {
    return this.afDB.object('/widget/facebook').update({ trigger1: param });
  }

  updateTrigger2(param: any) {
    return this.afDB.object('/widget/facebook').update({ trigger2: param });
  }

  updateTrigger3(param: any) {
    return this.afDB.object('/widget/facebook').update({ trigger3: param });
  }

  updateTrigger4(param: any) {
    return this.afDB.object('/widget/facebook').update({ trigger4: param });
  }

  updateTrigger5(param) {
    return this.afDB.object('/widget/facebook').update({ trigger5: param });
  }

  getTokenPage(id: any) {
    const apiCall = `https://graph.facebook.com/me/accounts?access_token=${id}`;
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("AllowAllOrigin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    return this.httpClient.get(`${apiCall}`).subscribe(
      data => {
        console.log(data);
        this.tokenPage = data,
        this.tokenService.updateTokenPageFacebook(this.tokenPage.data[0].access_token);
        this.tokenService.updateIDPageFacebook(this.tokenPage.data[0].id);
      });
  }
}
