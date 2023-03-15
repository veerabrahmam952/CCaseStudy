import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/HTTPService';
import { ItemCartCountService } from 'src/app/services/item-cart-count.service';

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

  constructor(private httpClient: HttpService, private route: ActivatedRoute,public itemCountService: ItemCartCountService){
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

  // Adding Items to the Cart using ID
  // Updated Cart Items with CartAdd API
  addToCart(prodId: number){
    let _prod_add_obj_ = {
      user_id: '583c3ac3f38e84297c002546',
      product_id: prodId,
    }
    this.httpClient
      .postData('/cart/add', _prod_add_obj_)
      .subscribe((data: any) => {
        console.log('/cart/add');
        console.log(data);
        if(data === "this product already is cart"){
          alert('Item already exists in the Cart...!');
        }else{
          this.itemCountService.updateItemCartCont(data.cart.length);
          alert('Item Added to Cart Successfully...!');
        }
      });
  }

  // Getting Product By ID using ProductByID API and display it on UI
  getProductById(prodId:number){
    let _sub_url_ = "/products/" + prodId;
    this.httpClient.getData(_sub_url_).subscribe((data:any) => {
      console.log("Products By Id");
      console.log(data);
      this.product = data.product;
    });
  }
}
