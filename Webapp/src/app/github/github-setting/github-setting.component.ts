import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/api/token.service';
import { GithubService } from '../github.service';
import { FacebookService } from 'src/app/facebook/facebook.service';

@Component({
  selector: 'app-github-setting',
  templateUrl: './github-setting.component.html',
  styleUrls: ['./github-setting.component.css']
})
export class GithubSettingComponent implements OnInit {

  isActiveTrigger1: number;
  isActiveTrigger2: number;
  isActiveTrigger3: number;
  isActiveTrigger4: number;
  isActiveTrigger5: number;
  isActiveTrigger6: number;
  userID: any;
  bearer: any;
  twitterToken: any;
  secretToken: any;
  accesFacebook: any;
  facebookPage: any;

  constructor(private router: Router, private token: TokenService, private github: GithubService, private fb: FacebookService) { }

  ngOnInit() {
    this.github.getGithubDatabase().then(z => {
      this.isActiveTrigger1 = z.trigger1;
      this.isActiveTrigger2 = z.trigger2;
      this.isActiveTrigger3 = z.trigger3;
      this.isActiveTrigger4 = z.trigger4;
      this.isActiveTrigger5 = z.trigger5;
      this.isActiveTrigger6 = z.trigger6;
    });
    this.token.getToken().then(z => {
      this.userID = z.UserId;
      this.bearer = z.jwTtoken;
      this.twitterToken = z.Twittertoken;
      this.secretToken = z.Twittersecret;
      this.accesFacebook = z.facebookAcces;
      this.facebookPage = z.FacebookPage;
    });
  }

  github1() {
    var applet_id = 8;
    var user_id = this.userID;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!) {
  addSouscription(applet_id: $applet_id, user_id: $user_id) {
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
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger1(0);
    this.router.navigate(['/dashboard']);
  }

  github2() {
    var applet_id = 9;
    var user_id = this.userID;
    var twitter_token = this.twitterToken;
    var twitter_secret = this.secretToken;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $twitter_token: String, $twitter_secret: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, twitter_token: $twitter_token, twitter_secret: $twitter_secret) {
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
          twitter_token,
          twitter_secret
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger2(0);
    this.router.navigate(['/dashboard']);
  }

  github3() {
    this.fb.getTokenPage(this.accesFacebook);
    var applet_id = 10;
    var user_id = this.userID;
    var fb_token  = this.facebookPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $fb_token: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, fb_token: $fb_token) {
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
          fb_token
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger3(0);
    this.router.navigate(['/dashboard']);
  }

  github4() {
    var applet_id = 11;
    var user_id = this.userID;
    var twitter_token = this.twitterToken;
    var twitter_secret = this.secretToken;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $twitter_token: String, $twitter_secret: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, twitter_token: $twitter_token, twitter_secret: $twitter_secret) {
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
          twitter_token,
          twitter_secret
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger4(0);
    this.router.navigate(['/dashboard']);
  }

  github5() {
    this.fb.getTokenPage(this.accesFacebook);
    var applet_id = 12;
    var user_id = this.userID;
    var fb_token  = this.facebookPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $fb_token: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, fb_token: $fb_token) {
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
          fb_token
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger5(0);
    this.router.navigate(['/dashboard']);
  }

  github6() {
    var applet_id = 15;
    var user_id = this.userID;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!) {
  addSouscription(applet_id: $applet_id, user_id: $user_id) {
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
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger6(0);
    this.router.navigate(['/dashboard']);
  }
}
