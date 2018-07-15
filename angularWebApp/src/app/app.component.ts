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
  userName: any;
  userAvatar: any;
  show: boolean

  constructor(public auth : AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    let user = this.auth.getUserInfo();
    if (this.auth.isAuthenticated()) {
      this.show = true;
      this.userName = 'David Campos';
    }else {
      this.show = false;
      this.userName = '';
    }
    console.log(user);
    //this.userName = user.name.firstName;
  }


}
