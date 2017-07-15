import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
//import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit {

  title = "Code Online Judge";

  profile: any;

  searchBox: FormControl = new FormControl();

  subscription: Subscription;

  constructor(public auth: AuthService, @Inject('input') private input, private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.auth.getProfile((profile) => {
      this.profile = profile;
    });

    this.subscription = this.searchBox
      //this property is a observable
      .valueChanges
      .subscribe(
        term => {
          this.input.changeInput(term);
        }
      );
  }


  searchProblem() :void{
    this.router.navigate(['/problems'])
  }

  //in case cause memory leak
  ngOnDestroy() :void{
    this.subscription.unsubscribe();
  }

}
