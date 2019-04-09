import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(public http: HttpClient,public router: Router, public apiservice: ApiService) { }

  login(data) {
    return this.apiservice.apiPost('/api/auth/login', data);
  }

  signUp(data) {
    return this.apiservice.apiPost('/api/auth/register', data);
  }

  logout() {
    return this.apiservice.apiGet('/api/auth/logout');
  }
}
