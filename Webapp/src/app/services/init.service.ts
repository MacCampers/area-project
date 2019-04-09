import { Injectable } from '@angular/core';
import { FacebookService } from '../facebook/facebook.service';
import { GithubService } from '../github/github.service';
import { TwitchService } from '../twitch/twitch.service';
import { TwitterService } from '../twitter/twitter.service';
import { WeatherService } from '../weather/weather.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private fb: FacebookService, private github: GithubService, private twitch: TwitchService, private twitter: TwitterService, private weather: WeatherService) { }

  initServices() {
    this.fb.updateTrigger1(0);
    this.fb.updateTrigger2(0);
    this.fb.updateTrigger3(0);
    this.fb.updateTrigger4(0);
    this.fb.updateTrigger5(0);
    this.fb.updateIsActive(0);
    this.github.updateTrigger1(0);
    this.github.updateTrigger2(0);
    this.github.updateTrigger3(0);
    this.github.updateTrigger4(0);
    this.github.updateTrigger5(0);
    this.github.updateTrigger6(0);
    this.github.updateIsActive(0);
    this.twitch.updateTrigger1(0);
    this.twitch.updateTrigger2(0);
    this.twitch.updateIsActive(0);
    this.twitter.updateTrigger1(0);
    this.twitter.updateTrigger2(0);
    this.twitter.updateIsActive(0);
    this.weather.updateTrigger1(0);
    this.weather.updateTrigger2(0);
    this.weather.updateTrigger3(0);
    this.weather.updateTrigger4(0);
    this.weather.updateIsActive(0);
  }
}
