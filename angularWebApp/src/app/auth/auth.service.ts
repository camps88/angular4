import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import root from 'window-or-global'
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {RequestOptions, Request, Headers } from '@angular/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'dlENGxZdCZuC-7a2GtP778splrPQMs0U',
    domain: 'gaptfg.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://gaptfg.eu.auth0.com/api/v2/',
    redirectUri: 'http://localhost:4200/signup',
    scope: 'openid profile email'
  });

  userAvatar = '';

  constructor(public router: Router,
              private http: HttpClient) {}



  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    console.log(this.auth0);
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("Entra");
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(authResult.idTokenPayload);
    let user = { firstName: authResult.idTokenPayload.given_name,
                 lastName: authResult.idTokenPayload.family_name,
                 fullName: authResult.idTokenPayload.name
               };
    console.log(user);
    this.userAvatar = authResult.idTokenPayload.picture;
    console.log(this.userAvatar);

    let userId = this.http.post('http://localhost:3003/auth', user, httpOptions)
        .subscribe(data => {
          console.log(data);
        });
    console.log(userId);
  //  let userObjectId =
  //    this.http.post('http://localhost:3003/auth', user, httpOptions).subscribe(data => {
  //          console.log(data);
  //    });
  //  console.log(this.http.post('http://localhost:3003/auth', user, httpOptions));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/signup']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public mostrarInfoUsuario (): void {
    console.log(this.auth0);
  }

  public getUserAvatarImage() {
    let userImage;
    this.auth0.parseHash((err, authResult) => {
      userImage = authResult.idTokenPayload.picture;
    });
    console.log(userImage);
  }
}
