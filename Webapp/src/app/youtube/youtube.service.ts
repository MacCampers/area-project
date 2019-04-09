import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private afDB: AngularFireDatabase) { }

  getYoutubeDatabase() {
    return this.afDB.database.ref('/widget/youtube').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param) {
    return this.afDB.object('/widget/youtube').update({ isActive: param });
  }
}
