import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { YoutubeService } from '../youtube/youtube.service';
import { TwitchService } from '../twitch/twitch.service';
import { TwitterService } from '../twitter/twitter.service';
import { FacebookService } from '../facebook/facebook.service';
import { TokenService } from '../api/token.service';
import { LoginService } from '../api/login.service';
import { AuthService } from '../authentification/services/auth.service';
import { Router } from '@angular/router';
import { GithubService } from '../github/github.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  isActiveWeather: number;
  isActiveFacebook: number;
  isActiveGithub: number;
  isActiveYoutube: number;
  isActiveTwitch: number;
  isActiveTwitter: number;
  JwtToken: any;
  newUser = { username: '', password: '' };
  errorCreate$: any;

  constructor(private weatherService: WeatherService, private youtubeService: YoutubeService, private twitchService: TwitchService, 
    private twitterService: TwitterService, private fb: FacebookService, private token: TokenService, private loginService: LoginService,
    private authService: AuthService, private router: Router, private github: GithubService) { }

  ngOnInit() {
    this.token.getToken().then(z => {
      this.JwtToken = z.jwTtoken;
    });
    this.weatherService.getWeatherDatabase().then(z => {
      this.isActiveWeather = z.isActive;
    });
    this.youtubeService.getYoutubeDatabase().then(z => {
      this.isActiveYoutube = z.isActive;
    });
    this.twitchService.getTwitchDatabase().then(z => {
      this.isActiveTwitch = z.isActive;
    });
    this.twitterService.getTwitterDatabase().then(z => {
      this.isActiveTwitter = z.isActive;
    });
    this.github.getGithubDatabase().then(z => {
      this.isActiveGithub = z.isActive;
    });
    this.fb.getFacebookDatabase().then(z => {
      this.isActiveFacebook = z.isActive;
    });
  }

  registerUser() {
    this.loginService.signUp(this.newUser);
    this.authService.registerLink(this.newUser.username, this.newUser.password)
      .then(createdUser => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        this.errorCreate$ = error.message;
        console.log(error.message);
      })
  }

}
