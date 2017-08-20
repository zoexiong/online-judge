import { Injectable, Inject } from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(@Inject('auth') private auth, private router: Router) { }

  canActivate(): boolean {
    if(this.auth.isAuthenticated()){
      return true
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  isAdmin() {
    if (localStorage['profile']){
      var profile = JSON.parse(localStorage['profile']);
      if (profile['http://localhost:3000/roles']){
        var roles = profile['http://localhost:3000/roles'];
        if(this.auth.isAuthenticated() && roles.includes('admin')){
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
