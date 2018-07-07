import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'SpotIT';
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
  ngOnInit() {
  //  let userAvatarImage = this.auth.getUserAvatarImage();
  }



}
