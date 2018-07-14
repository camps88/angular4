import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-popular-searches',
  templateUrl: './popular-searches.component.html',
  styleUrls: ['./popular-searches.component.css']
})
export class PopularSearchesComponent implements OnInit {

  data: any = {};
  results = {};
  webLinks = [];
  popularLinks1 = [];
  popularLinks2 = [];
  originalImage: SafeUrl;
  object: any = {};
  favorite: boolean;
  state: any;

  constructor(private apiService: ApiService,
              private _domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.webLinks = [];
    this.apiService.getPopulars().subscribe(data => {
      this.data = data;
      console.log(this.data);
      let keys = Object.keys(this.data);
      console.log(keys);
      if (this.data !== undefined) {
        for (let i=0; i < keys.length; i++) {
          let items = this.data[keys[i]].items;
          console.log(items);
          for (let j=0; j < items.length; j++) {
            let titleShorted = items[j].displayLink.slice(0,25) + '...';
            console.log(titleShorted);
            this.results = {
              link: items[j].formattedUrl,
              image: items[j].pagemap.cse_image[0].src,
              title: titleShorted,
            }
            this.webLinks.push(this.results);
          }
          console.warn(this.webLinks);
          this.popularLinks1.push(this.webLinks);
          this.success = true;
        }
      }else {
        this.success = false;
      }

      console.log(this.popularLinks1[0]);
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
