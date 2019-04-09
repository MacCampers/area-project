import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TwitchService } from '../twitch.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/api/token.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class TwitchSettingsComponent implements OnInit {

  form: FormGroup;
  isActiveTrigger1: number;
  isActiveTrigger2: number;
  userID: any;
  bearer: any;

  constructor(private formBuilder: FormBuilder, public twitch: TwitchService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      streamer: ['', Validators.required],
    });
    this.twitch.getTwitchDatabase().then(z => {
      this.isActiveTrigger1 = z.trigger1;
      this.isActiveTrigger2 = z.trigger2;
    });
    this.token.getToken().then(z => {
      this.userID = z.UserId;
      this.bearer = z.jwTtoken;
    });
  }

  streamer1() {
    if (this.form.valid) {
      var applet_id = 3;
      var user_id = this.userID;
      var streamer = this.form.value.streamer;
      var query =
        `mutation addSouscription($applet_id: ID!, $user_id: String!, $streamer: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, streamer: $streamer) {
    applet {
    id
}
}
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
            streamer
          }
        })
      }).then(data => console.log('data returned:', data));
      this.twitch.updateTrigger1(0);
      this.router.navigate(['/dashboard']);
    }
  }

  streamer2() {
    if (this.form.valid) {
      this.twitch.updateTrigger2(0);
      this.router.navigate(['/dashboard']);
    }
  }
}
