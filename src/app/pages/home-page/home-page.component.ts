import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { FakeBackendInterceptor } from 'src/app/providers/FakeBackendProvider';
import { HttpService } from 'src/app/services/HTTPService';
import { ItemCartCountService } from 'src/app/services/item-cart-count.service';

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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title = 'Card View Demo';

  gridColumns = 3;
  products: Array<Product> = [];
  constructor(private router: Router, private httpClient: HttpService, private itemCountService: ItemCartCountService) {
    // Load the all the products
    this.httpClient.getData('/products').subscribe((data: any) => {
      console.log('/products');
      console.log(data);
      this.products = data.products;
    });
  }
  ngOnInit(): void {}
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  // Add Items to the Cart
  addToCart(prodId: number) {
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

  // Show the product details by navigating to product page
  goToProductDetails(prodId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: prodId,
      },
    };
    this.router.navigate(['/product'], navigationExtras);
  }
}
