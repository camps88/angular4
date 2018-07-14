import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { AppRoutingModule } from './/app-routing.module';
import { ApiService } from './api/api.service';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { RecentSearchesComponent } from './recent-searches/recent-searches.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PopularSearchesComponent } from './popular-searches/popular-searches.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    SignupComponent,
    RecentSearchesComponent,
    FavoritesComponent,
    PopularSearchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebcamModule,
    NgxSpinnerModule,    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
