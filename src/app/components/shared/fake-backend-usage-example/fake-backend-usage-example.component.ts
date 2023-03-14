import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/HTTPService';

@Component({
  selector: 'app-fake-backend-usage-example',
  templateUrl: './fake-backend-usage-example.component.html',
  styleUrls: ['./fake-backend-usage-example.component.scss']
})
export class FakeBackendUsageExampleComponent {
  constructor(private httpClient: HttpService) {
  }
  getData(){
    this.httpClient.postData("/users/authenticate", {username: "test1@test.com", password: "11111111"}).subscribe((data:any) => {
      console.log("/users/authenticate");
      console.log(data);
    });
    this.testProducts();
    this.testCart();
    this.testOrders()
  }
  testOrders(){
    this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 1}).subscribe((data:any) => {
      console.log("/cart/add");
      console.log(data);
      this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 2}).subscribe((data:any) => {
        console.log("/cart/add");
        console.log(data);
        this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 2}).subscribe((data:any) => {
          console.log("/cart/add");
          console.log(data);
          this.httpClient.postData("/order/new", {user_id: "583c3ac3f38e84297c002546"}).subscribe((data:any) => {
            console.log("/order/new");
            console.log(data);
            this.httpClient.getData("/order/583c3ac3f38e84297c002546").subscribe((data:any) => {
              console.log("/order//583c3ac3f38e84297c002546");
              console.log(data); 
            });
          });
        });
      });
    });
  }
  testCart(){
    this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 1}).subscribe((data:any) => {
      console.log("/cart/add");
      console.log(data);
        this.httpClient.postData("/cart/remove", {user_id: "583c3ac3f38e84297c002546", product_id: 1}).subscribe((data:any) => {
          console.log("/cart/remove");
          console.log(data);
          this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 2}).subscribe((data:any) => {
            console.log("/cart/add");
            console.log(data);
            this.httpClient.postData("/cart/add", {user_id: "583c3ac3f38e84297c002546", product_id: 1}).subscribe((data:any) => {
              console.log("/cart/add");
              console.log(data);
              this.httpClient.getData("/cart/583c3ac3f38e84297c002546").subscribe((data:any) => {
                console.log("/cart/583c3ac3f38e84297c002546");
                console.log(data);
            })
          })
      });
    });
   });
  }
  testProducts(){
    this.httpClient.getData("/products").subscribe((data:any) => {
      console.log("/products");
      console.log(data);
    });
    this.httpClient.getData("/products/1").subscribe((data:any) => {
      console.log("/products/1");
      console.log(data);
    });
    this.httpClient.postData("/products", {ids: [1, 2, 5, 6]}).subscribe((data:any) => {
      console.log("/products");
      console.log(data);
    });
    
  }
}
