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
              private _DomSanitizer: DomSanitizer) { }

  data: any = {};
  results = {};
  items: Array<Object[]>;
  webLinks = [];
  description = [];
  elements = [];
  originalImage: SafeResourceUrl;
  show:boolean;


    ngOnInit() {
      this.show = false;
      this.webLinks = [];
      this.apiService.getRecentSearches().subscribe(data => {
        this.data = data;
        console.log(this.data);
        let items = this.data;
        if (items !== undefined) {
          for (let i=0; i < items.length; i++) {
            let titleShorted = items[i].description[0].slice(0,25) + '...';
            console.log(titleShorted);
            this.results = {
              id: items[i]._id,
              image: items[i].originalImage,
              title: titleShorted,
              items: items[i].content.items,
            }
            this.webLinks.push(this.results);
            this.success = true;
          }
        }else {
          this.success = false;
        }

        console.log(this.webLinks);
      });
    }

    showItems(results) {
      this.show = true;
      return this.items = results;
    }
}
