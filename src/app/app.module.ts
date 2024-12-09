import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentListComponentComponent } from './components/payment-list-component/payment-list-component.component';
import { PaymentDetailsComponentComponent } from './components/payment-details-component/payment-details-component.component';
import { AddPaymentComponentComponent } from './components/add-payment-component/add-payment-component.component';
import { EditPaymentComponentComponent } from './components/edit-payment-component/edit-payment-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponentComponent,
    PaymentDetailsComponentComponent,
    AddPaymentComponentComponent,
    EditPaymentComponentComponent,
    MainPageComponent,
    HeaderComponent,
    SearchComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
