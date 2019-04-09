import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchService } from '../twitch.service';
import { TokenService } from 'src/app/api/token.service';

@Component({
  selector: 'app-twitch1',
  templateUrl: './twitch1.component.html',
  styleUrls: ['./twitch1.component.css']
})
export class Twitch1Component implements OnInit {

  isActive: any;
  userID: any;
  bearer: any;

  constructor(private router: Router, public twitchService: TwitchService, private token: TokenService) { }

  ngOnInit() {
    this.twitchService.getTwitchDatabase().then(data => {
      this.isActive = data.trigger1;
    });
    this.token.getToken().then(data => {
      this.userID = data.UserId;
      this.bearer = data.jwTtoken;
    });
  }

  activate() {
    if (this.isActive == 0) {
      this.twitchService.updateTrigger1(1);
      this.router.navigate(['/twitch-setting']);
    }
  }

  desactivate() {
    var user_id = this.userID;
    var applet_id = 3;
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
    this.twitchService.updateTrigger1(0);
    location.reload();
  }
}