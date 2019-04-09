import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { TokenService } from 'src/app/api/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github2',
  templateUrl: './github2.component.html',
  styleUrls: ['./github2.component.css']
})
export class Github2Component implements OnInit {

  isActive: any;
  userID: any;
  bearer: any;

  constructor(private github: GithubService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.github.getGithubDatabase().then(data => {
      this.isActive = data.trigger2;
      });
    this.token.getToken().then(data => {
      this.userID = data.UserId;
      this.bearer = data.jwTtoken;
    });
  }

  activate() {
    if (this.isActive == 0) {
      this.github.updateTrigger2(1);
      this.router.navigate(['/github-setting']);
    }
  }

  desactivate() {
    var user_id = this.userID;
    var applet_id = 9;
    var query =
      `mutation removeSouscription($applet_id: ID!, $user_id: String!) {
        removeSouscription(applet_id: $applet_id, user_id: $user_id)
}`;
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${this.bearer}`
      },
      body: JSON.stringify({
        query,
        variables: {
          applet_id,
          user_id,
        }
      })
    }).then(data => console.log('data returned:', data));
    this.github.updateTrigger2(0);
    location.reload();
  }
}
