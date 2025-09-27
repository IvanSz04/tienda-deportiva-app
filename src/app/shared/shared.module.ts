import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProductCardComponent } from '../components/product-card/product-card.component';
import { LoadingSkeletonComponent } from '../components/loading-skeleton/loading-skeleton.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    LoadingSkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ProductCardComponent,
    LoadingSkeletonComponent
  ]
})
export class SharedModule {}