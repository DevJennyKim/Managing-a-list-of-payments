import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
import { ApiService } from 'src/app/services/api.service';

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
  selectedFile: File | null = null;
  constructor(private apiService: ApiService) {}
  close() {
    this.closeModal.emit();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

    if (
      this.payment.payee_payment_status === 'completed' &&
      this.selectedFile
    ) {
      this.uploadEvidence(this.selectedFile);
    } else {
      this.updatePaymentRecord();
    }
    this.saveChanges.emit(this.payment);
    this.close();
  }

  uploadEvidence(file: File) {}

  updatePaymentRecord() {}
}
