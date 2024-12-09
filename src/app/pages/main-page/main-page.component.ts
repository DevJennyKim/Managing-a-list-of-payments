import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PaymentRecord } from 'src/app/model/type.model';

@Component({
  selector: 'pay-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  payments: PaymentRecord[] = [];
  currentPage = 1;
  totalPages: number = 1;
  limit: number = 20;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.apiService
      .getPaymentRecord(this.currentPage, this.limit)
      .subscribe((data: any) => {
        this.payments = data.payments;
        this.totalPages = data.totalPages;
      });
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchPayments();
  }
}
