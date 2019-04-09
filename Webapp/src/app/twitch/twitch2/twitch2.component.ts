import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchService } from '../twitch.service';

@Component({
  selector: 'app-twitch2',
  templateUrl: './twitch2.component.html',
  styleUrls: ['./twitch2.component.css']
})
export class Twitch2Component implements OnInit {

  isActive: any;

  constructor(private router: Router, public twitchService: TwitchService) { }

  ngOnInit() {
    this.twitchService.getTwitchDatabase().then(data => {
      this.isActive = data.trigger2;
    });
  }

  activate() {
    if (this.isActive == 0) {
      this.twitchService.updateTrigger2(1);
      this.router.navigate(['/twitch-setting']);
    }
  }

  desactivate() {
    this.twitchService.updateTrigger2(0);
  }
}
