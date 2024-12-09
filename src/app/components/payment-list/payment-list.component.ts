import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';

@Component({
  selector: 'pay-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent {
  @Input() payments: PaymentRecord[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageRange: number[] = [];

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() prevPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
  goToPrevious(): void {
    this.prevPage.emit();
  }
  goToNext(): void {
    this.nextPage.emit();
  }

  displayedColumns: string[] = [
    'fullname',
    'paymentStatus',
    'dueDate',
    'address',
    'location',
    'phoneNumber',
    'email',
    'currency',
    'dueAmount',
    'edit',
    'delete',
  ];
  constructor() {}
  ngOnInit(): void {}
}
