import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent }      from './loading/loading.component';

const routes: Routes = [
  { path: 'loading', component: LoadingComponent }
];

@NgModule({
  imports:[
       RouterModule.forRoot(routes)
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
