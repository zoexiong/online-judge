import { Component, OnInit, Inject } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {

  title = "Code Online Judge";

  username = "Justkzoe";

  constructor(@Inject('auth') private auth) {
    auth.handleAuthentication();
  }


  ngOnInit() {

  }
}
