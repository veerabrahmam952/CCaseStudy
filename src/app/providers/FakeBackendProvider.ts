import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { async, Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let AllUsers: any = {root: []};
let AllProducts: any =  {root: []};
let AllUsersData: any =  {root: []};
getWorkData("../../assets/JSONData/users.json", AllUsers);
getWorkData("../../assets/JSONData/products.json", AllProducts);
getWorkData("../../assets/JSONData/usersData.json", AllUsersData, true, "AllUsersData");

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/cart/add') && method === 'POST':
                    return addToCart();
                case url.endsWith('/cart') && method === 'DELETE':
                    return removeFromCart();
                case url.endsWith('/cart') && method === 'PUT':
                    return changeCartProductAmount();
                case url.endsWith('/order/new') && method === 'POST':
                    return createOrder();
                case url.endsWith('/products') && method === 'POST':
                    return getProductsByIDList();
                case url.endsWith('/products') && method === 'GET':
                    return getAllProducts();
                case url.match(/\/cart\/[0-9a-fA-F]+/) && method === 'GET':
                    return getCart(url.split('/').pop() || '');
                case url.match(/\/order\/[0-9a-fA-F]+/) && method === 'GET':
                    return getOrders(url.split('/').pop() || '');
                case url.match(/\/products\/\d+$/) && method === 'GET':
                    return getProductByID(url.split('/').pop() || '');
                default:
                    return next.handle(request);
            }    
        }

        function authenticate() {
            const { username, password } = body;
            const user = AllUsers.root.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.user_id,
                username: user.username,
            })
        }
        
        function addToCart(){
            const { user_id, product_id } = body;
            let userData = AllUsersData.root.find((x: { user_id: any}) => x.user_id === user_id);
            let indexOfUser = AllUsersData.root.indexOf(userData);
            if(!userData.cart.find((x: {product_id: any}) => x.product_id == product_id)){
                userData.cart.push({product_id: product_id, amount: 1});
                AllUsersData.root.splice(indexOfUser, 1, userData);
                localStorage.setItem('AllUsersData', JSON.stringify(AllUsersData));
            } else{
                return ok("this product already is cart");
            }
            return ok({
                cart: userData.cart
            })
        }
        function removeFromCart(){
            const { user_id, product_id } = body;
            const userData = AllUsersData.root.find((x: { user_id: any}) => x.user_id === user_id);
            const indexOfUser = AllUsersData.root.indexOf(userData);
            const product = userData.cart.find((x: {product_id: any}) => x.product_id == product_id)
            if(product){
                const indexOfProduct = userData.cart.indexOf(product);
                userData.cart.splice(indexOfProduct, 1);
                AllUsersData.root.splice(indexOfUser, 1, userData);
                localStorage.setItem('AllUsersData', JSON.stringify(AllUsersData));
            } else{
                return ok("no such product in order");
            }
            return ok({
                cart: userData.cart
            })
        }

        function changeCartProductAmount(){
            const { user_id, product_id, amount } = body;
            let userData = AllUsersData.root.find((x: { user_id: any}) => x.user_id === user_id);
            if(userData){
                let indexOfUser = AllUsersData.root.indexOf(userData);
                let cartProduct = userData.cart.find((x: { product_id: any}) => x.product_id === product_id);
                if(cartProduct){
                    let indexOfCartProduct = userData.cart.indexOf(cartProduct);
                    if(amount == 0){
                        let indexOfProduct = userData.cart.indexOf(userData);
                        userData.cart.splice(indexOfProduct, 1);
                    } else {
                        cartProduct.amount = amount;
                        userData.cart.splice(indexOfCartProduct, 1, cartProduct);
                    }
                    AllUsersData.root.splice(indexOfUser, 1, userData);
                    localStorage.setItem('AllUsersData', JSON.stringify(AllUsersData));
                    return ok({
                        cart: userData.cart
                    })
                }
                return ok("no such product in order");
            }
            return ok("no such user");
        }
        function getCart(user_id: string){
            if(user_id){
                let userData = AllUsersData.root.find((x: { user_id: any }) => x.user_id == user_id);
                let userCart = userData.cart;
                if(userCart){
                    return ok({
                        cart: userCart
                    })    
                }
                return ok("cart is empty")
            } 
            return ok("no such user")
        }
        function createOrder(){
            const { user_id } = body;
            let userData = AllUsersData.root.find((x: { user_id: any}) => x.user_id === user_id);
            if(userData){
                let indexOfUser = AllUsersData.root.indexOf(userData);
                let cart = userData.cart;
                let currentOrder;
                if(cart.length && cart.length > 0){
                    currentOrder = {
                        order_id: Date.now().toString(),
                        orderDetails: cart
                    }
                    userData.cart = [];
                    userData.orders.push(currentOrder)
                    AllUsersData.root.splice(indexOfUser, 1, userData);
                    localStorage.setItem('AllUsersData', JSON.stringify(AllUsersData));
                    return ok({
                        order: currentOrder
                    })
                }
                return ok("cart is empty");
            }
            return ok("no such user");
        }
        function getOrders(user_id: string){
            if(user_id){
                let userData = AllUsersData.root.find((x: { user_id: any }) => x.user_id == user_id);
                let userOrders = userData.orders;
                if(userOrders){
                    return ok({
                        orders: userOrders
                    })    
                }
                return ok("no orders")
            } 
            return ok("no such user")
        }
        function  getAllProducts() {
            return ok({
                products: AllProducts.root
            });
        }
        function getProductsByIDList(){
            const { ids } = body;
            if(ids){
                let products: any[] = [];
                AllProducts.root.filter(
                    (product: { id: any; }) => {
                        if(ids.includes(product.id)){
                            products.push(product);
                        }
                    });
                return ok({
                    products: products
                });
            }
            return ok("empty request");
        }
        function getProductByID(id: string){
            if(id){
                let product = AllProducts.root.find((x: { id: any }) => x.id == id);
                return ok({
                    product: product
                });
            } 
            return ok("no such product");
            
        }


        function ok(body: { }) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
    }
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

async function getWorkData(filePath: string, variable: any, shouldCheckLocalStorage?: boolean, localStorageTitle?:string){
    if(shouldCheckLocalStorage){
        let localStorageData = localStorage.getItem(localStorageTitle || '')
        if(localStorageData) {
            variable.root = JSON.parse(localStorageData || '').root;
            return;
        }
    }
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", filePath , true);
        rawFile.send(null);
        rawFile.onreadystatechange = await function (){
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    var allText = rawFile.responseText;
                    variable.root = JSON.parse(allText);
                }
            }
        }
}

