import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormatCurrencyPipe } from './shared/format-currency.pipe';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent,
    PaymentDetailsComponent,
    AddPaymentComponent,
    EditPaymentComponent,
    MainPageComponent,
    HeaderComponent,
    SearchComponent,
    FormatCurrencyPipe,
    InputFieldComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), DatePipe],
})
export class AppModule {}
