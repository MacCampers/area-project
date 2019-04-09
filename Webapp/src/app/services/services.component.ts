import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { YoutubeService } from '../youtube/youtube.service';
import { TwitchService } from '../twitch/twitch.service';
import { TwitterService } from '../twitter/twitter.service';
import { FacebookService } from '../facebook/facebook.service';
import { TokenService } from '../api/token.service';
import { AuthProviderService } from '../authentification/services/auth-provider.service';
import { GithubService } from '../github/github.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  TwitterToken: any;
  FacebookToken: any;
  GoogleToken: any;
  GithubToken: any;

  constructor(private weatherService: WeatherService, private githubService: GithubService,
    private youtubeService: YoutubeService, private twitchService: TwitchService,
    private twitterService: TwitterService, private facebookService: FacebookService,
    private token: TokenService, private location: Location, private authProvider: AuthProviderService) { }

  ngOnInit() {
    this.token.getToken().then(value => {
      this.TwitterToken = value.Twittertoken;
      this.FacebookToken = value.Facebooktoken;
      this.GoogleToken = value.Googletoken;
      this.GithubToken = value.Githubtoken;
    });
  }

  activateWeather() {
    this.weatherService.updateIsActive(1);
  }

  desactivateWeather() {
    this.weatherService.updateIsActive(0);
  }

  activateYoutube() {
    if (this.GoogleToken == 0) {
      this.authProvider.signInWithGoogle();
    }
      this.youtubeService.updateIsActive(1);
  }

  desactivateYoutube() {
    this.youtubeService.updateIsActive(0);
  }

  activateTwitter() {
    if (this.TwitterToken == 0) {
      this.authProvider.signInWithTwitter();
    }
      this.twitterService.updateIsActive(1);
  }

  desactivateTwitter() {
      this.twitterService.updateIsActive(0);
  }

  activateFacebook() {
    if (this.FacebookToken == 0) {
      this.authProvider.signInWithFacebook();
    }
      this.facebookService.updateIsActive(1);
  }

  desactivateFacebook() {
    this.facebookService.updateIsActive(0);
  }

  activateGithub() {
    if (this.GithubToken == 0) {
      this.authProvider.signInWithGithub();
    }
      this.githubService.updateIsActive(1);
  }

  desactivateGithub() {
    this.githubService.updateIsActive(0);
  }

  activateTwitch() {
    this.twitchService.updateIsActive(1);
  }

  desactivateTwitch() {
    this.twitchService.updateIsActive(0);
  }
}
