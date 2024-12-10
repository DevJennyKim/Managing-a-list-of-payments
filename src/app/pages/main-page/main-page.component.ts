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

  constructor(private apiService: ApiService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.fetchPayments();
    this.detectMobileView();
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

  detectMobileView(): void {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    this.isMobile = mediaQuery.matches;
    console.log('Initial isMobile:', this.isMobile);
    this.pageEnd = this.isMobile ? 3 : 10;
    this.updatePageRange();
    mediaQuery.addEventListener('change', (event) => {
      this.ngZone.run(() => {
        this.isMobile = event.matches;
        console.log('Updated isMobile:', this.isMobile);
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

  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPayments = this.payments.filter((payment) => {
      const matchesSearchTerm = this.searchTerm
        ? payment.payee_first_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          payment.payee_last_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          payment.payee_email
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatusFilter = this.statusFilter
        ? payment.payee_payment_status.toLowerCase() ===
          this.statusFilter.toLowerCase()
        : true;

      return matchesSearchTerm && matchesStatusFilter;
    });
  }
}
