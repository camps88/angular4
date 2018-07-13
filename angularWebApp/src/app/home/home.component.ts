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
  filtered: boolean;
  hideResults: boolean;
  checkboxEbay: boolean;
  checkboxAmazon: boolean;


  ngOnInit() {
    this.showHome = true;
    this.filtered = false;
    this.hideResults = false;
  }
  data: any = {};
  dataFiltered: any = {};
  user: any;
  webLinks = [];
  webLinksFiltered = [];
  results = {};
  filters = [];
  filteredResults = {};
  image: any;
  favorite: boolean = false;
  state: any;


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
    this.image = imageUploaded;
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

  applyFilters(event) {
    console.log(event.target.value);
    if (event.target.checked) {
        this.filters.push(event.target.value);
    }else {
      if (event.target.value === 'amazon') {
        this.filters.push('ebay');
      }else {
        this.filters.push('amazon');
      }
    }
    if (this.filters.length > 1) {
      this.filters=[];
    }
    console.log(this.filters);
  }

  getResults() {
    this.webLinks = [];
    // this.webLinksFiltered = [];
    if (this.filters.length < 1) {
      this.uploadImage(this.image);
    }else {
      this.filtered = true;
      console.log(this.filters);
      this.apiService.sendFilters(this.filters, this.data.idImage).subscribe(result => {
          this.dataFiltered = result;
          console.log(this.dataFiltered);
          let itemsFiltered = this.dataFiltered.items;
          for (let i=0; i < itemsFiltered.length; i++) {
              if (itemsFiltered[i].pagemap) {
                this.filteredResults = {
                  title: itemsFiltered[i].title,
                  shopLink: itemsFiltered[i].displayLink,
                  webLink: itemsFiltered[i].link,
                  imageLink: itemsFiltered[i].pagemap.cse_image[0].src,
                }
                this.webLinks.push(this.filteredResults);
                console.log(this.webLinksFiltered);
              }
          }
        });
    }
  }

  setFavorite (event) {
    console.warn(event);
    if (document.getElementById('favorite')) {
      this.favorite = false;
    }else {
      this.favorite = true;
    }
    this.apiService.setFavorite(this.data.idImage).subscribe(data => {
      console.log(data);
      this.state = data;
    });
  }


}
