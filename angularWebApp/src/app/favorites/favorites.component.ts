import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private apiService: ApiService,
              private _domSanitizer: DomSanitizer) { }

  data: any = {};
  results = {};
  webLinks = [];
  description = [];
  elements = [];
  originalImage: SafeUrl;
  favorite: boolean = false;
  state: any;

  ngOnInit() {
    this.webLinks = [];
    this.apiService.getFavorites().subscribe(data => {
      this.data = data;
      console.log(this.data);
      let items = this.data;
      for (let i=0; i < items.length; i++) {
        this.originalImage = this._domSanitizer.bypassSecurityTrustUrl(this.data[i].originalImage);
        console.log(this.originalImage);
        this.results = {
          id: items[i]._id,
          image: this.originalImage,
          title: items[i].displayLink,
          items: items[i].content.items,
        }
        this.webLinks.push(this.results);
      }
    });
  }

  setFavorite (image) {
    console.warn(image.data);
    if (document.getElementById('favorite')) {
      this.favorite = false;
    }else {
      this.favorite = true;
    }
    console.log(this.webLinks);
    this.apiService.setFavorite(image.id).subscribe(data => {
      console.log(data);
      this.state = data;
    });
  }

}
