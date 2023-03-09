import { Component } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  title = 'Card View Demo';

  gridColumns = 3;

  constructor(private router: Router){

  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  addToCart(num: number){
    alert('Item Added to Cart Successfully');
  }

  goToProductDetails(num: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: num
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }
}
