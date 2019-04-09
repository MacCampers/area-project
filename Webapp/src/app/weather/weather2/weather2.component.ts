import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/api/token.service';

@Component({
  selector: 'app-weather2',
  templateUrl: './weather2.component.html',
  styleUrls: ['./weather2.component.css']
})
export class Weather2Component implements OnInit {

  isActive: any;
  userID: any;
  bearer: any;

  constructor(private weatherService: WeatherService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.weatherService.getWeatherDatabase().then(data => {
      this.isActive = data.trigger2;
    });
    this.token.getToken().then(data => {
      this.userID = data.UserId;
      this.bearer = data.jwTtoken;
    });
  }

  activate() {
    if (this.isActive == 0) {
      this.weatherService.updateTrigger2(1);
      this.router.navigate(['/weather-setting']);
    }
  }

  desactivate() {
    var user_id = this.userID;
    var applet_id = 2;
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
    this.weatherService.updateTrigger2(0);
    location.reload();
  }
}
