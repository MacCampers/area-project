import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../facebook.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/api/token.service';

@Component({
  selector: 'app-facebook2',
  templateUrl: './facebook2.component.html',
  styleUrls: ['./facebook2.component.css']
})
export class Facebook2Component implements OnInit {

  isActive: any;
  userID: any;
  bearer: any;

  constructor(private fb: FacebookService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.fb.getFacebookDatabase().then(data => {
      this.isActive = data.trigger2;
    });
    this.token.getToken().then(data => {
      this.userID = data.UserId;
      this.bearer = data.jwTtoken;
    });
  }

  activate() {
    if (this.isActive == 0) {
      this.fb.updateTrigger2(1);
      this.router.navigate(['/facebook-setting']);
    }
  }

  desactivate() {
    var user_id = this.userID;
    var applet_id = 7;
    var query =
      `mutation removeSouscription($applet_id: ID!, $user_id: String!) {
        removeSouscription(applet_id: $applet_id, user_id: $user_id) 
}`;
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${this.bearer}`
      },
      body: JSON.stringify({
        query,
        variables: {
          applet_id,
          user_id,
        }
      })
    }).then(data => console.log('data returned:', data));
    this.fb.updateTrigger2(0);
    location.reload();
  }
}
