import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../facebook.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook3',
  templateUrl: './facebook3.component.html',
  styleUrls: ['./facebook3.component.css']
})
export class Facebook3Component implements OnInit {

  isActive: any;

  constructor(private fb: FacebookService, private router: Router) { }

  ngOnInit() {
    this.fb.getFacebookDatabase().then(data => {
      this.isActive = data.trigger3;
    });
  }
   
  activate() {
    if (this.isActive == 0) {
    this.fb.updateTrigger3(1);
    this.router.navigate(['/facebook-setting']);
  }
}
  
  desactivate() {
    this.fb.updateTrigger3(0);
  }
}
