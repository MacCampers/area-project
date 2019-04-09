import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/api/token.service';

@Component({
  selector: 'app-weathersetting',
  templateUrl: './weathersetting.component.html',
  styleUrls: ['./weathersetting.component.css']
})
export class WeathersettingComponent implements OnInit {

  form: FormGroup;
  isActiveTrigger1: number;
  isActiveTrigger2: number;
  isActiveTrigger3: number;
  userID: any;
  bearer: any;
  triggerSave1: any;
  triggerSave2: any;
  triggerSave3: any;

  constructor(private formBuilder: FormBuilder, public weather: WeatherService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      city: ['', Validators.required],
    });
    this.weather.getWeatherDatabase().then(z => {
      this.isActiveTrigger1 = z.trigger1;
      this.isActiveTrigger2 = z.trigger2;
      this.isActiveTrigger3 = z.trigger3;
      this.triggerSave1 = z.trigger1;
      this.triggerSave2 = z.trigger2;
      this.triggerSave3 = z.trigger3;
    });
    this.token.getToken().then(z => {
      this.userID = z.UserId;
      this.bearer = z.jwTtoken;
    });
  }

  city1() {
    if (this.form.valid) {
      var applet_id = 1;
      var user_id = this.userID;
      var city = this.form.value.city;
      var query =
        `mutation addSouscription($applet_id: ID!, $user_id: String!, $city: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, city: $city) {
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
            city
          }
        })
      }).then(data => console.log('data returned:', data));
      this.weather.updateTrigger1(0);
      this.router.navigate(['/dashboard']);
    }
  }

  city2() {
    if (this.form.valid) {
      var applet_id = 2;
      var user_id = this.userID;
      var city = this.form.value.city;
      var query =
        `mutation addSouscription($applet_id: ID!, $user_id: String!, $city: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, city: $city) {
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
            city
          }
        })
      }).then(data => console.log('data returned:', data));
      this.weather.updateTrigger2(0);
      this.router.navigate(['/dashboard']);
    }
  }

  city3() {
    /* var applet_id = 78978654132;
    var user_id = this.userID;
    var city = this.form.value.city;
    var query =
      `mutation addSouscription($applet_id: ID!, $user_id: String!, $city: String) {
  addSouscription(applet_id: $applet_id, user_id: $user_id, city: $city) {
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
          city
        }
      })
    }).then(data => console.log('data returned:', data)); */
    if (this.form.valid) {
      this.weather.updateTrigger3(0);
      this.router.navigate(['/dashboard']);
    }
  }
}
