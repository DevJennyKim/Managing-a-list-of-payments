import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentRecord } from 'src/app/model/type.model';
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

  close() {
    this.closeModal.emit();
  }
}
