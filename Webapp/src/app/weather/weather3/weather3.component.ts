import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather3',
  templateUrl: './weather3.component.html',
  styleUrls: ['./weather3.component.css']
})
export class Weather3Component implements OnInit {

  isActive: any;

  constructor(private weatherService: WeatherService, public router: Router) { }

  ngOnInit() {
    this.weatherService.getWeatherDatabase().then(data => {
      this.isActive = data.trigger3;
    })
  }

  activate() {
    if (this.isActive == 0) {
      this.weatherService.updateTrigger3(1);
      this.router.navigate(['/weather-setting']);
    }
  }

  desactivate() {
    this.weatherService.updateTrigger3(0);
    location.reload();
  }
}
