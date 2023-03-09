import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/components/shared/material-module';
import { OrdersPageComponent } from './orders-page.component';

export const routes =[
    {path: '', component: OrdersPageComponent}
]

@NgModule({
  declarations: [
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    
  ]
})
export class OrderPageModule { }
