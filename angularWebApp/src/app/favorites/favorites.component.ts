import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private apiService: ApiService,
              private _DomSanitizer: DomSanitizer,
              private spinnerService: Ng4LoadingSpinnerService) { }

  data: any = {};
  results = {};
  webLinks = [];
  description = [];
  elements = [];
  originalImage: SafeUrl;
  favorite: boolean = true;
  state: any;
  items: Array<Object[]>;
  show:boolean;
  success: boolean = true;

  ngOnInit() {
    this.spinnerService.show();
    this.webLinks = [];
    const o = this.apiService.getFavorites().subscribe(data => {
      this.data = data;
      console.log(this.data);
      let items = this.data;
      for (let i=0; i < items.length; i++) {
        if (items !== undefined) {
          let titleShorted = items[i].description[0].slice(0,25) + '...';
          console.log(titleShorted);
          this.results = {
            id: items[i]._id,
            image: items[i].originalImage,
            title: titleShorted,
            items: items[i].content.items,
          }
          this.favorite = true;
          this.webLinks.push(this.results);
          this.success = true;
          this.spinnerService.hide();
        }else {
          this.favorite = false;
          this.success = false;
          this.spinnerService.hide();
        }
      }
    });
    setTimeout(() => { o.unsubscribe(); this.spinnerService.hide(); if ( this.data.length < 1)  this.success = false;  }, 10000);

  }

  setFavorite (image) {
    this.spinnerService.show();
    console.warn(image);
    if (document.getElementById('favorite')) {
      this.favorite = false;
    }else {
      this.favorite = true;
    }
    console.log(this.webLinks);
    this.apiService.setFavorite(image.id).subscribe(data => {
      console.log(data);
      this.state = data;
      this.spinnerService.hide();
    });
  }

  showItems(results) {
    this.show = true;
    return this.items = results;
  }

}
