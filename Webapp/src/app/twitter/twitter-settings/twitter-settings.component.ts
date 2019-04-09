import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TwitterService } from '../twitter.service';
import { TokenService } from 'src/app/api/token.service';

@Component({
  selector: 'app-twitter-settings',
  templateUrl: './twitter-settings.component.html',
  styleUrls: ['./twitter-settings.component.css']
})
export class TwitterSettingsComponent implements OnInit {

  form: FormGroup;
  isActiveTrigger1: number;
  isActiveTrigger2: number;
  tokenAcces: any;
  secretAcces: any;
  bearer: any;
  userID: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private twitter: TwitterService, private token: TokenService) { }

  ngOnInit() {
    this.twitter.getTwitterDatabase().then(value => {
      this.isActiveTrigger1 = value.trigger1;
      this.isActiveTrigger2 = value.trigger2;
    });
    this.token.getToken().then(value => {
      this.userID = value.UserId;
      this.tokenAcces = value.Twittertoken;
      this.secretAcces = value.Twittersecret;
      this.bearer = value.jwTtoken;
    });
    this.form = this.formBuilder.group({
      city: ['', Validators.required],
    });
  }

  TwitterWeather() {
    if (this.form.valid) {
      var applet_id = 4;
      var user_id = this.userID;
      var city = this.form.value.city;
      var twitter_token = this.tokenAcces;
      var twitter_secret = this.secretAcces;
      var query =
        `mutation addSouscription($applet_id: ID!, $user_id: String!, $city: String, $twitter_token: String, $twitter_secret: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, twitter_token: $twitter_token, twitter_secret: $twitter_secret, city: $city) {
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
            city,
            twitter_token,
            twitter_secret
          }
        })
      }).then(data => console.log('data returned:', data));
      this.twitter.updateTrigger1(0);
      this.router.navigate(['/dashboard']);
    }
  }

  TwitterTwitch() {
    if (this.form.valid) {
      var applet_id = 5;
      var user_id = this.userID;
      var streamer = this.form.value.city;
      var twitter_token = this.tokenAcces;
      var twitter_secret = this.secretAcces;
      var query =
        `mutation addSouscription($applet_id: ID!, $user_id: String!, $streamer: String, $twitter_token: String, $twitter_secret: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, streamer: $streamer, twitter_token: $twitter_token, twitter_secret: $twitter_secret) {
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
            streamer,
            twitter_token,
            twitter_secret
          }
        })
      }).then(data => console.log('data returned:', data));
      this.twitter.updateTrigger2(0);
      this.router.navigate(['/dashboard']);
    }
  }
}
