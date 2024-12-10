import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent, title: 'Home - Payment list' },
  {
    path: 'add-payment',
    component: AddPaymentComponent,
    title: 'Create - payment record',
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
