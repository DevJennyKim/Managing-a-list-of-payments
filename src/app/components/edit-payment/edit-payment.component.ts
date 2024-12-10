import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
import { ApiService } from 'src/app/services/api.service';
import { cloneDeep } from 'lodash';

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
  tempPayment!: PaymentRecord;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.isOpen) {
      this.tempPayment = cloneDeep(this.payment);
    }
  }

  close() {
    this.closeModal.emit();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSave() {
    if (
      this.tempPayment.payee_payment_status === 'completed' &&
      this.selectedFile
    ) {
      this.uploadEvidence(this.selectedFile);
    } else {
      this.updatePaymentRecord();
    }
  }

  uploadEvidence(file: File) {
    this.apiService.uploadEvidence(this.tempPayment._id, file).subscribe(
      (response: any) => {
        this.tempPayment.evidence_file_url = response.fileUrl;
        this.tempPayment.payee_payment_status = 'completed';
        this.saveChanges.emit(this.tempPayment);
      },
      (error) => {
        console.error('Error uploading evidence:', error);
      }
    );
  }

  updatePaymentRecord() {
    this.apiService.updatePaymentRecord(this.tempPayment).subscribe(
      (response) => {
        console.log('Payment record updated successfully:', response);
        this.saveChanges.emit(this.tempPayment);
      },
      (error) => {
        console.error('Error updating payment record:', error);
      }
    );
  }
}
