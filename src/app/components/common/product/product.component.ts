import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/HTTPService';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
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
  thumbnail:string;
  title: string;
}

export interface productParams{
  productId: number
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  

  title = 'Card View Demo';

  gridColumns = 2;

  product:Product={
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    id: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
  };

  productID: number=0;

  constructor(private httpClient: HttpService, private route: ActivatedRoute,){
    this.route.queryParams.subscribe(async(params) => {
      if (params && params['productId']) {
        this.productID = params['productId'];
        this.getProductById(this.productID);
      }
    });
    
  }

  ngOnInit() {
    
  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  addToCart(num: number){
    alert('Item Added to Cart Successfully');
  }

  getProductById(prodId:number){
    let _sub_url_ = "/products/" + prodId;
    this.httpClient.getData(_sub_url_).subscribe((data:any) => {
      console.log("Products By Id");
      console.log(data);
      this.product = data.product;
    });
  }
}
