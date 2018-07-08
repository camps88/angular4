import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  showHome: boolean;
  ngOnInit() {
    this.showHome = true;
  }
  data: any = {};
  user: any;
  webLinks = [];
  results = {};

  dropFile (event) {
    console.log(event);
    console.log(event.dataTransfer.files);
    event.preventDefault();
    let dropZone = document.getElementById('dropzone');
    dropZone.className = 'dropzone';
    this.encodeFile(event);
  }

  dragOver(event){
    let dropZone = document.getElementById('dropzone');
    dropZone.className = 'dropzone dragover';
    event.stopPropagation();
    event.preventDefault();
  }

  encodeFile(event) {
    this.showHome = false;
    let reader = new FileReader();
    console.log('entra en encode');
    if(event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      let file = event.dataTransfer.files[0];
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        let imageUploaded = { imageBase64 : reader.result.split(',')[1] };
        console.log(imageUploaded);
        this.uploadImage(imageUploaded);
      }
    }
  }

  uploadImage(imageUploaded) {
    this.apiService.uploadImage(imageUploaded).subscribe(data => {
        this.data = data;
        console.log(this.data);
        let items = this.data.image.items;
        for (let i=0; i < items.length; i++) {
            if (items[i].pagemap) {
              this.results = {
                title: items[i].title,
                shopLink: items[i].displayLink,
                webLink: items[i].link,
                imageLink: items[i].pagemap.cse_image[0].src,
              }
              this.webLinks.push(this.results);
              console.log(this.webLinks);
            }
        }
      }
    );
  }

}
