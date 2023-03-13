import { Component } from '@angular/core';

interface Item {
  id: string;
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
  cartItems: Item[] = [
    {
      id: '1',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.YpiwJqZc-AvPnc4GHpt5yQHaHR&pid=Api&P=0',
      price: 20,
      quantity: 2,
      title: 'test',
    },
    {
      id: '2',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.YpiwJqZc-AvPnc4GHpt5yQHaHR&pid=Api&P=0',
      price: 20,
      quantity: 2,
      title: 'test',
    },
    {
      id: '3',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.YpiwJqZc-AvPnc4GHpt5yQHaHR&pid=Api&P=0',
      price: 20,
      quantity: 2,
      title: 'test',
    },
    {
      id: '4',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.YpiwJqZc-AvPnc4GHpt5yQHaHR&pid=Api&P=0',
      price: 20,
      quantity: 2,
      title: 'test',
    },
  ];
}
