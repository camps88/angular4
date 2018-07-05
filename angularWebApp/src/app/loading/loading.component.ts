import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  data: any = {};
  user: any;
  // webLinks: any[];
  constructor(public apiService: ApiService) { }

  webLinks = [];


  ngOnInit() {
  //  this.getUserInfo();
    // this.uploadImage();
  }

/*  getUserInfo() {
    this.authService.handleAuthentication().subscribe(userInfo => {
      console.log("Bienvenido, " + userInfo.fullName);
      this.user = userInfo;
    });
  }
*/
/*  uploadImage() {
    this.apiService.uploadImage().subscribe(data => {
        console.log(data);
        this.data = data;
        for (let i=0; i < this.data.webDetection.pagesWithMatchingImages.length; i++) {
          this.webLinks.push(this.data.webDetection.pagesWithMatchingImages[i]);
        }
      }
    );
  }
*/
}
