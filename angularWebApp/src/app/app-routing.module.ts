import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'loading', component: LoadingComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports:[
       RouterModule.forRoot(routes)
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
