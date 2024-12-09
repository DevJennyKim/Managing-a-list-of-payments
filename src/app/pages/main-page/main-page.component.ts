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
  totalItems: number = 0;
  limit: number = 20;
  pageRange: number[] = [];
  pageStart = 1;
  pageEnd = 10;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.apiService
      .getPaymentRecord(this.currentPage, this.limit)
      .subscribe((data: any) => {
        this.payments = data.payments;
        this.totalItems = data.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.limit);
        this.updatePageRange();
      });
  }
  updatePageRange(): void {
    const rangeStart = Math.max(1, this.pageStart);
    const rangeEnd = Math.min(this.totalPages, this.pageEnd);
    this.pageRange = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => rangeStart + i
    );
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchPayments();
  }

  goToPrevious(): void {
    if (this.pageStart > 1) {
      this.pageStart -= 10;
      this.pageEnd -= 10;
      this.updatePageRange();
    }
  }

  goToNext(): void {
    if (this.pageEnd < this.totalPages) {
      this.pageStart += 10;
      this.pageEnd += 10;
      this.updatePageRange();
    }
  }
}
