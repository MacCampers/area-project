import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../facebook.service';
import { TokenService } from 'src/app/api/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-setting',
  templateUrl: './facebook-setting.component.html',
  styleUrls: ['./facebook-setting.component.css']
})
export class FacebookSettingComponent implements OnInit {

  tokenAcces: any;
  tokenPage: any;
  form: FormGroup;
  isActiveTrigger1: number;
  isActiveTrigger2: number;
  isActiveTrigger3: number;
  isActiveTrigger4: number;
  isActiveTrigger5: number;
  userID: any;
  bearer: any;
  PageID: any;

  constructor(private fb: FacebookService, private token: TokenService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.token.getToken().then(value => {
      this.tokenAcces = value.facebookAcces;
      this.userID = value.UserId;
      this.bearer = value.jwTtoken;
      this.PageID = value.FacebookPageID;
    });
    this.fb.getFacebookDatabase().then(z => {
      this.isActiveTrigger1 = z.trigger1;
      this.isActiveTrigger2 = z.trigger2;
      this.isActiveTrigger3 = z.trigger3;
      this.isActiveTrigger4 = z.trigger4;
      this.isActiveTrigger5 = z.trigger5;
    });
    this.token.getToken().then(z => {
      this.tokenPage = z.FacebookPage;
    });
    this.form = this.formBuilder.group({
      city: ['', Validators.required],
    });
  }

  facebook1() {
    this.fb.getTokenPage(this.tokenAcces);
    var applet_id = 6;
    var user_id = this.userID;
    var city = this.form.value.city;
    var fb_token = this.tokenPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $city: String, $fb_token: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, city: $city, fb_token: $fb_token) {
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
          fb_token
        }
      })
    }).then(data => console.log('data returned:', data));
    this.fb.updateTrigger1(0);
    this.router.navigate(['/dashboard']);
  }

  facebook2() {
    this.fb.getTokenPage(this.tokenAcces);
    var applet_id = 7;
    var user_id = this.userID;
    var streamer = this.form.value.city;
    var fb_token = this.tokenPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $streamer: String, $fb_token: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, streamer: $streamer, fb_token: $fb_token) {
    applet {
    id
}
}
}`;
    fetch('http://localhost:8080//graphql', {
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
          fb_token
        }
      })
    }).then(data => console.log('data returned:', data));
      this.fb.updateTrigger2(0);
      this.router.navigate(['/dashboard']);
  }

  facebook3() {
    this.fb.getTokenPage(this.tokenAcces);
    this.fb.updateTrigger2(0);
    this.router.navigate(['/dashboard']);
  }

  facebook4() {
    this.fb.getTokenPage(this.tokenAcces);
    var applet_id = 13;
    var user_id = this.userID;
    var fb_id = this.PageID;
    var fb_token = this.tokenPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $fb_token: String, $fb_id: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, fb_token: $fb_token, fb_id: $fb_id) {
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
          fb_token,
          fb_id
        }
      })
    }).then(data => console.log('data returned:', data));
    this.fb.updateTrigger4(0);
    this.router.navigate(['/dashboard']);
  }

  facebook5() {
    this.fb.getTokenPage(this.tokenAcces);
    var applet_id = 14;
    var user_id = this.userID;
    var fb_id = this.PageID;    
    var fb_token = this.tokenPage;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $fb_token: String, $fb_id: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, fb_token: $fb_token, fb_id: $fb_id) {
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
          fb_token,
          fb_id
        }
      })
    }).then(data => console.log('data returned:', data));
    this.fb.updateTrigger5(0);
    this.router.navigate(['/dashboard']);
  }
}
