import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentification/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  dashboardPage() {
    this.router.navigate(['/dashboard']);
  }

  servicesPage() {
    this.router.navigate(['/services']);
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
