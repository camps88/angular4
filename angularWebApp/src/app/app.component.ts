import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'SpotIT';

  constructor(public auth : AuthService) {
    auth.handleAuthentication();
    let user = auth.getUserInfo();
    console.log(user);
    // let userName = user.firstName;
  }

  ngOnInit() {}


}
