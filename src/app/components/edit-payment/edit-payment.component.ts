import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';

@Component({
  selector: 'pay-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss'],
  standalone: false,
})
export class EditPaymentComponent {
  @Input() payment!: PaymentRecord;
  @Input() isOpen!: boolean;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<PaymentRecord>();

  close() {
    this.closeModal.emit();
  }
  onSave() {
    if (
      this.payment.payee_payment_status === 'completed' &&
      !this.payment.evidence_file_url
    ) {
      alert(
        'Please upload evidence before changing the status to "Completed".'
      );
      return;
    }
    this.saveChanges.emit(this.payment);
    this.close();
  }
}
