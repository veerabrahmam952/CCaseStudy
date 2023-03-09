import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductComponent } from 'src/app/components/common/product/product.component';
import { SharedMaterialModule } from 'src/app/components/shared/material-module';

export const routes =[
    {path: '', component: ProductComponent}
]

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    
  ]
})
export class ProductPageModule { }
