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

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
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
