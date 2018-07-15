import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    SlideshowModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  declarations: []
})
export class HomeModule { }
