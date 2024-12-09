import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddPaymentComponentComponent } from './components/add-payment-component/add-payment-component.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent, title: 'Home - Payment list' },
  {
    path: 'add-payment',
    component: AddPaymentComponentComponent,
    title: 'Create - payment record',
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
