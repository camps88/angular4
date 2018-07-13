import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.css'],
})
export class RecentSearchesComponent implements OnInit {


  constructor(private apiService: ApiService,
              private _domSanitizer: DomSanitizer) { }

  data: any = {};
  results = {};
  webLinks = [];
  description = [];
  elements = [];
  originalImage: SafeUrl;


    ngOnInit() {
      this.webLinks = [];
      this.apiService.getRecentSearches().subscribe(data => {
        this.data = data;
        console.log(this.data);
        let items = this.data;
        for (let i=0; i < items.length; i++) {
          this.originalImage = this._domSanitizer.bypassSecurityTrustUrl(this.data[i].originalImage);
          console.log(this.originalImage);
          this.results = {
            image: this.originalImage,
            title: items[i].displayLink,
            items: items[i].content.items,
          }
          this.webLinks.push(this.results);
        }
      });
    }
}
