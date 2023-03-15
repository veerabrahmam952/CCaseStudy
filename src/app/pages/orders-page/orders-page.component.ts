import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/HTTPService';

export interface Order{
  order_id: string,
  orderDetails: Array<orderDetails>
}

export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<[]>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export interface orderDetails{
  amount: number,
  product: Product
}
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})

export class OrdersPageComponent implements OnInit{
  Orders:Array<Order>=[];
  scrollEnable!: boolean;
  constructor(private httpClient: HttpService){
    this.httpClient.getData("/order/583c3ac3f38e84297c002546").subscribe((data:any) => {
      console.log("/order//583c3ac3f38e84297c002546");
      console.log(data);
      this.Orders = data.orders;
    });
  }
  ngOnInit(): void {
    
  }
  getWidth(order:any){
    if(order.orderDetails.length>2){
      return true;
    } else{
      return false;
    }
  }
}
