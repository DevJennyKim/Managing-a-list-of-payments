import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
import { ApiService } from 'src/app/services/api.service';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

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
    } else if (
      this.tempPayment.payee_payment_status === 'completed' &&
      !this.selectedFile
    ) {
      this.toastr.error('Please provide the evidence.', 'No Evidence Provided');
      return;
    } else {
      this.updatePaymentRecord();
    }
  }

  uploadEvidence(file: File) {
    this.apiService.uploadEvidence(this.tempPayment._id, file).subscribe(
      (response: any) => {
        this.tempPayment.evidence_file_url = response.fileUrl;
        this.tempPayment.payee_payment_status = 'completed';
        this.updatePaymentRecord();
      },
      (error) => {
        console.error('Error uploading evidence:', error);
      }
    );
  }

  updatePaymentRecord() {
    this.apiService.updatePaymentRecord(this.tempPayment).subscribe(
      (response) => {
        this.toastr.success('Data saved successfully!', 'Success');
        this.saveChanges.emit(this.tempPayment);
      },
      (error) => {
        this.toastr.error('Failed to save data.', 'Error');
        console.error('Error updating payment record:', error);
      }
    );
  }
}
