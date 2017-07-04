import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit {

  title = "Code Online Judge";

  username = "Justkzoe";

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {

  }

}
