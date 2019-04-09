import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private afDB: AngularFireDatabase, public apiservice: ApiService) { }

  getWeatherDatabase() {
    return this.afDB.database.ref('/widget/weather').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param) {
    return this.afDB.object('/widget/weather').update({ isActive: param });
  }

  updateCity(city) {
    return this.afDB.object('/widget/weather').update(city);
  }

  updateTrigger1(param) {
    return this.afDB.object('/widget/weather').update({ trigger1: param });
  }

  updateTrigger2(param) {
    return this.afDB.object('/widget/weather').update({ trigger2: param });
  }

  updateTrigger3(param) {
    return this.afDB.object('/widget/weather').update({ trigger3: param });
  }

  updateTrigger4(param) {
    return this.afDB.object('/widget/weather').update({ trigger4: param });
  }
}
