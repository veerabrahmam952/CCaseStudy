import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'product', loadChildren: () => import('./components/common/product/product.module').then(m => m.ProductPageModule)},
  {path:'orders', loadChildren:()=>import('./pages/orders-page/orders-page.module').then(m=>m.OrderPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
