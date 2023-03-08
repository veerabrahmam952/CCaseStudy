import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductComponent } from 'src/app/components/common/product/product.component';
import { SharedMaterialModule } from 'src/app/components/shared/material-module';
import { HomePageComponent } from './home-page.component';

export const routes =[
    {path: '', component: HomePageComponent}
]

@NgModule({
  declarations: [
    HomePageComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    
  ]
})
export class HomePageModule { }
