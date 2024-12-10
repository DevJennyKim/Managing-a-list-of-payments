import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'pay-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
  standalone: false,
})
export class PaymentDetailsComponent {
  @Input() payment!: PaymentRecord;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  close() {
    this.closeModal.emit();
  }

  downloadEvidence(paymentId: string): void {
    this.apiService.downloadEvidence(paymentId).subscribe(
      (response: Blob) => {
        const downloadUrl = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${paymentId}_evidence.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      (error) => {
        console.error('Error downloading evidence:', error);
      }
    );
  }
}
