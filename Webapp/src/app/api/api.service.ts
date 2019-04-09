import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../authentification/services/auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080';
  token: any;

  constructor(private http: HttpClient, private afDB: AngularFireDatabase, private auth: AuthService, private tokenService: TokenService) { }

  apiGet(path = '') {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("AllowAllOrigin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    return this.http.get(`${this.apiUrl}${path}`, { headers }).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

  apiPost(path, data) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("AllowAllOrigin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    return this.http.post(`${this.apiUrl}${path}`, data, { headers }).subscribe(
      data => {
        this.token = data;
        if (this.token.jwTtoken && this.token.userId) {
          this.tokenService.updateUserToken(this.token.jwTtoken);
          this.tokenService.updateUserID(this.token.userId);
        }
      }
    );
  }

  apiDelete(path) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.delete(`${this.apiUrl}${path}`, { headers: headers });
  }
}