import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FakeBackendInterceptor } from 'src/app/providers/FakeBackendProvider';
import { HttpService } from 'src/app/services/HTTPService';
import { ItemCartCountService } from 'src/app/services/item-cart-count.service';

const userId = '583c3ac3f38e84297c002546';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  cartItemCount: number=0;
  hidden=false;
  constructor(private httpClient: HttpService, public itemCountService: ItemCartCountService){
    this.getCartItemCount();
  }
   ngOnInit() {
    this.itemCountService.itemsCart$.subscribe(value =>{
      this.cartItemCount = value;
    });
  }

  getCartItemCount(){
    this.httpClient
    .getData<{ cart: { product_id: string; amount: number }[] }>(
      `/cart/${userId}`
    )
    .subscribe((data) => {
      if(data.cart?.length > 0){
        this.itemCountService.updateItemCartCont(data.cart.length)
      } 
    })
  }
}
