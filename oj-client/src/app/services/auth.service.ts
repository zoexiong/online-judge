import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js/build/auth0.js';
import { Http, Response, Headers } from "@angular/http";
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: '77qZhSotzYJwgx1U3NYeEE9YGGD71Qd6',
    domain: 'justkzoe.auth0.com',
    responseType: 'token id_token',
    audience: 'https://justkzoe.auth0.com/userinfo',
    redirectUri: 'http://35.164.242.163:3000/',
    scope: 'openid profile email'
  });

  domain = 'justkzoe.auth0.com';
  clientId = '77qZhSotzYJwgx1U3NYeEE9YGGD71Qd6';

  constructor(public router: Router, private http: Http) {
  }

  public login(): void {
    //get current path
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var path = parser.pathname;
    localStorage.setItem('redirectUri', path);
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';

        this.setSession(authResult);
        //access local storage to get the path and redirect to original page
        if (localStorage['redirectUri']) {
          this.router.navigate([localStorage['redirectUri']]);
          window.location.reload(false);
          localStorage.setItem('redirectUri', '');
        }
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      } else if (localStorage['redirectUri']) {
        this.router.navigate([localStorage['redirectUri']]);
        localStorage.setItem('redirectUri', '');
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {

    //get current path
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var path = parser.pathname;
    localStorage.setItem('redirectUri', path);

    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (localStorage['profile']) {
      cb(JSON.parse(localStorage['profile']));
    } else if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          cb(profile);
          localStorage.setItem('profile', JSON.stringify(profile));
        }
      });
    } else {
        console.log('Access token must exist to fetch profile');
    }
  }

  public resetPassword(): void {
    let profile = JSON.parse(localStorage['profile']);
    let url: string = `https://${this.domain}/dbconnections/change_password`;
    let headers = new Headers({'content-type': 'application/json'});
    let body = {
      client_id: this.clientId,
      email: profile.email,
      connection: 'Username-Password-Authentication'
    };

    this.http.post(url, body, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error);
  }

}
