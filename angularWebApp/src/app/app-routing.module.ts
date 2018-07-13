import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { RecentSearchesComponent } from './recent-searches/recent-searches.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PopularSearchesComponent } from './popular-searches/popular-searches.component';



const routes: Routes = [
  { path: 'loading', component: LoadingComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recent-searches', component: RecentSearchesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'popular-searches', component: PopularSearchesComponent }
];

@NgModule({
  imports:[
       RouterModule.forRoot(routes)
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
