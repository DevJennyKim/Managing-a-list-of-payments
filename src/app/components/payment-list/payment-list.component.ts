import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() isLoading: boolean = false;
  selectedPayment: any = null;
  isDetailModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() prevPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
  goToPrevious(): void {
    this.prevPage.emit();
  }
  goToNext(): void {
    this.nextPage.emit();
  }

  openDetailModal(payment: PaymentRecord) {
    this.selectedPayment = payment;
    this.isDetailModalOpen = true;
  }
  closeDetailModal() {
    this.isDetailModalOpen = false;
  }

  deletePaymentRecord(event: MouseEvent, payment: any) {
    event.stopPropagation();

    this.apiService.deletePaymentRecord(payment._id).subscribe(() => {
      this.payments = this.payments.filter((p) => p._id !== payment._id);
    });
  }

  openEditModal(event: MouseEvent, payment: PaymentRecord) {
    event.stopPropagation();
    this.selectedPayment = payment;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  savePaymentDetails(updatedPayment: PaymentRecord) {
    this.apiService.getPaymentRecordById(updatedPayment._id).subscribe(
      (payment: any) => {
        const index = this.payments.findIndex(
          (payment) => payment._id === updatedPayment._id
        );
        console.log('payment: ', payment);

        if (index > -1) {
          this.payments[index] = payment.payment;
        }
        this.payments = [...this.payments];
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating payment details:', error);
        this.toastr.error('Failed to update payment details.', 'Error');
      }
    );
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
  ngOnInit(): void {}
}
