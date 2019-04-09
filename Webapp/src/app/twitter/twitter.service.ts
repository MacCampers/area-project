import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private afDB: AngularFireDatabase) { }

  getTwitterDatabase() {
    return this.afDB.database.ref('/widget/twitter').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param) {
    return this.afDB.object('/widget/twitter').update({ isActive: param });
  }

  updateTrigger1(param) {
    return this.afDB.object('/widget/twitter').update({ trigger1: param });
  }

  updateTrigger2(param) {
    return this.afDB.object('/widget/twitter').update({ trigger2: param });
  }
}
