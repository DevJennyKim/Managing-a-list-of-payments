import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PaymentRecord } from 'src/app/model/type.model';

@Component({
  selector: 'pay-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: false,
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
  isMobile = false;
  searchTerm: string = '';
  statusFilter: string = '';
  filteredPayments: PaymentRecord[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.fetchPayments();
    this.detectMobileView();
  }

  fetchPayments(): void {
    this.isLoading = true;

    this.apiService
      .getPaymentRecord(
        this.currentPage,
        this.limit,
        this.searchTerm || undefined,
        this.statusFilter || undefined
      )
      .subscribe((data: any) => {
        this.payments = data.payments;
        this.totalItems = data.totalItems;
        console.log(this.totalItems);

        this.totalPages = Math.ceil(this.totalItems / this.limit);
        this.updatePageRange();

        this.isLoading = false;
      });
  }

  detectMobileView(): void {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    this.isMobile = mediaQuery.matches;
    this.pageEnd = this.isMobile ? 3 : 10;
    this.updatePageRange();
    mediaQuery.addEventListener('change', (event) => {
      this.ngZone.run(() => {
        this.isMobile = event.matches;
        this.pageEnd = this.isMobile ? 3 : 10;
        this.updatePageRange();
      });
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
      const decrement = this.isMobile ? 3 : 10;
      this.pageStart -= decrement;
      this.pageEnd -= decrement;
      this.updatePageRange();
    }
  }

  goToNext(): void {
    if (this.pageEnd < this.totalPages) {
      const increment = this.isMobile ? 3 : 10;
      this.pageStart += increment;
      this.pageEnd += increment;
      this.updatePageRange();
    }
  }
  onStatusChange(status: string) {
    this.statusFilter = status;
    this.fetchPayments();
  }

  onSearchChange() {
    this.fetchPayments();
  }
}
