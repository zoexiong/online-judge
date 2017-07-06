import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //email: string = '';
  //username: string = '';
  profile: any;

  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    this.auth.getProfile((profile) => {
      this.profile = profile;
    });
  }

  resetPassword() {
    this.auth.resetPassword();
  }

}
