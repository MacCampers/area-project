import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private afDB: AngularFireDatabase) { }

  
  getGithubDatabase() {
    return this.afDB.database.ref('/widget/github').once('value').then(function (DataSnapshot) {
      return DataSnapshot.val();
    })
  }

  updateIsActive(param: any) {
    return this.afDB.object('/widget/github').update({ isActive: param });
  }

  updateTrigger1(param: any) {
    return this.afDB.object('/widget/github').update({ trigger1: param });
  }

  updateTrigger2(param: any) {
    return this.afDB.object('/widget/github').update({ trigger2: param });
  }

  updateTrigger3(param: any) {
    return this.afDB.object('/widget/github').update({ trigger3: param });
  }

  updateTrigger4(param: any) {
    return this.afDB.object('/widget/github').update({ trigger4: param });
  }

  updateTrigger5(param: any) {
    return this.afDB.object('/widget/github').update({ trigger5: param });
  }
  updateTrigger6(param: any) {
    return this.afDB.object('/widget/github').update({ trigger6: param });
  }
}
