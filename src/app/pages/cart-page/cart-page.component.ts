import { Component, OnInit } from '@angular/core';
import {
  map,
  switchMap,
  merge,
  flatMap,
  mergeMap,
  toArray,
  iif,
  of,
  forkJoin,
  Observable,
  combineLatest,
} from 'rxjs';
import { Product } from 'src/app/components/common/product/product.component';
import { HttpService } from 'src/app/services/HTTPService';
import { ItemCartCountService } from 'src/app/services/item-cart-count.service';

interface Item {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const userId = '583c3ac3f38e84297c002546';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  items: Item[] = [];
  isLoading = true;

  constructor(private httpClient: HttpService, public itemCountService: ItemCartCountService) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  removeItem(id: number) {
    this.isLoading = true;
    this.httpClient
      .deleteData('/cart', { user_id: userId, product_id: id })
      .subscribe(() => {
        this.fetchCart();
      });
  }

  changeQuantity(event: {id: number, quantity: number}) {
    console.log(event);
    this.httpClient
      .putData('/cart', {
        user_id: userId,
        product_id: event.id,
        amount: event.quantity,
      })
      .subscribe(() => {
        this.fetchCart();
      });
  }

  fetchCart() {
    debugger;
    this.httpClient
      .getData<{ cart: { product_id: string; amount: number }[] }>(
        `/cart/${userId}`
      )
      .pipe(
      mergeMap(({ cart }) =>
        iif(()=> cart.length > 0, forkJoin(
          cart.map((ci) =>
            this.httpClient
              .getData<{ product: Product }>(`/products/${ci.product_id}`)
              .pipe(
                map(({ product }) => {
                  return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.thumbnail,
                    quantity: ci.amount,
                  };
                })
              )
          )
        ), of([]))
        
      )     
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.items = data;
        this.itemCountService.updateItemCartCont(data.length);
      });
  }
}
