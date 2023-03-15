import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Item {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  @Input()
  cartItems: Item[] = [];

  @Output()
  onRemoveItem = new EventEmitter();

  @Output()
  onChangeAmount = new EventEmitter();

  // Removing Item from the cart by Id number
  removeItem(id: number) {
    this.onRemoveItem.emit(id);
  }

  // Increasing or decreasing the quantity of the product
  changeAmount(id: number, increase: boolean) {
    const item = this.cartItems.find((ci) => ci.id === id);

    if (!item) throw Error('No such item');

    if (!increase && item.quantity == 1) {
      this.removeItem(id);
      return;
    }

    this.onChangeAmount.emit({
      id,
      quantity: increase ? item.quantity + 1 : item.quantity - 1,
    });
  }
}
