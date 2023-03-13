import { Component, Input } from '@angular/core';

interface Item {
  title: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss'],
})
export class CartPaymentComponent {
  @Input()
  items: Item[] = [];

  calculateTotal() {
    return this.items.length > 0
      ? this.items.map((i) => i.quantity * i.price).reduce((s, e) => s + e)
      : 0;
  }
}
