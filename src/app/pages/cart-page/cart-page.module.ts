import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { CartListComponent } from "src/app/components/common/cart-list/cart-list.component";
import { CartPaymentComponent } from "src/app/components/common/cart-payment/cart-payment.component";
import { SharedMaterialModule } from "src/app/components/shared/material-module";
import { CartPageComponent } from "./cart-page.component";

const routes = [{path: '', component: CartPageComponent}]

@NgModule({
    declarations: [
        CartPageComponent,
        CartListComponent,
        CartPaymentComponent
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,
        RouterModule.forChild(routes)
    ]
})
export class CartPageModule {}