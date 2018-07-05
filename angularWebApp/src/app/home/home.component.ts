import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  data: any = {};
  user: any;
  webLinks = [];

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
        console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        let imageUploaded = { imageBase64 : reader.result.split(',')[1] };
        console.log(imageUploaded);
        this.apiService.uploadImage(imageUploaded).subscribe(data => {
            console.log(data);
            this.data = data;
            for (let i=0; i < this.data.webDetection.pagesWithMatchingImages.length; i++) {
              this.webLinks.push(this.data.webDetection.pagesWithMatchingImages[i]);
            }
          }
        );
      }
    }
  }

}
