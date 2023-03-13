import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { OrderComponent } from './components/common/order/order.component';
import { FakeBackendProvider } from './providers/FakeBackendProvider';
import { HttpService } from './services/HTTPService';
import { SharedMaterialModule } from './components/shared/material-module';
import { FakeBackendUsageExampleComponent } from './components/shared/fake-backend-usage-example/fake-backend-usage-example.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    FakeBackendUsageExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule
  ],
  providers: [
    HttpService,
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
