import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/HTTPService';
import { ItemCartCountService } from 'src/app/services/item-cart-count.service';

interface Item {
  title: string;
  price: number;
  quantity: number;
}
const userId = '583c3ac3f38e84297c002546';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss'],
})
export class CartPaymentComponent {
  @Input()
  items: Item[] = [];
  constructor(private httpClient: HttpService, private router: Router, public itemCountService: ItemCartCountService) {
  }

  // Claculating Total Amount Price in the cart
  calculateTotal() {
    return this.items.length > 0
      ? this.items.map((i) => i.quantity * i.price).reduce((s, e) => s + e)
      : 0;
  }

  // Placing the order and call the orderNew Api to insert into order
  goToOrder(){
    this.httpClient.postData("/order/new", {user_id: "583c3ac3f38e84297c002546"}).subscribe((data:any) => {
      console.log("/order/new");
      this.getCartItemCount();
      alert("you have successfully placed Items...! check your Items in the order Page.");
      this.router.navigate(["/"]);
    });
  }
  
  // Update the Cart Item Count to show it on Cart icon
  getCartItemCount(){
    this.httpClient
    .getData<{ cart: { product_id: string; amount: number }[] }>(
      `/cart/${userId}`
    )
    .subscribe((data) => {
      if(data.cart.length >= 0){
        this.itemCountService.updateItemCartCont(data.cart.length)
      } 
    })
  }
}
