import { Component, OnInit, Inject } from '@angular/core';
//import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit {

  title = "Code Online Judge";

  profile: any;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.auth.getProfile((profile) => {
      this.profile = profile;
    });
  }
}
