import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  constructor(private afDB: AngularFireDatabase, public apiservice: ApiService) { }

  getTwitchDatabase() {
    return this.afDB.database.ref('/widget/twitch').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param) {
    return this.afDB.object('/widget/twitch').update({ isActive: param });
  }

  updateTrigger1(param) {
    return this.afDB.object('/widget/twitch').update({ trigger1: param });
  }

  updateTrigger2(param) {
    return this.afDB.object('/widget/twitch').update({ trigger2: param });
  }
}
