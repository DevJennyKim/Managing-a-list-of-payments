import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';

@Component({
  selector: 'pay-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  standalone: false,
})
export class PaymentListComponent {
  @Input() payments: PaymentRecord[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageRange: number[] = [];
  selectedPayment: any = null;
  isModalOpen: boolean = false;

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

  openModal(payment: any) {
    this.selectedPayment = payment;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedPayment = null;
  }

  displayedColumns: string[] = [
    'fullname',
    'paymentStatus',
    'dueDate',
    'address',
    'location',
    'phoneNumber',
    'email',
    'totalDue',
    'edit',
    'delete',
  ];
  constructor() {}
  ngOnInit(): void {}
}
