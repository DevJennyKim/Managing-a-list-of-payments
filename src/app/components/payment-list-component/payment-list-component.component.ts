import { Component } from '@angular/core';

@Component({
  selector: 'pay-payment-list-component',
  templateUrl: './payment-list-component.component.html',
  styleUrls: ['./payment-list-component.component.scss'],
})
export class PaymentListComponentComponent {
  payments = [
    {
      fullName: 'Jane Doe',
      paymentStatus: 'Completed',
      dueDate: '2024-12-20',
      address: '1234 Elm St, Apt 56',
      city: 'Metropolis',
      country: 'CountryName',
      state: 'StateName',
      postalCode: '12345',
      phoneNumber: '+1234567890',
      email: 'john.doe@example.com',
      currency: 'USD',
      dueAmount: 4950,
    },
    {
      fullName: 'Ellen Cruz',
      paymentStatus: 'pending',
      dueDate: '2024-12-09',
      address: '892 Jessica Inlet, Apt. 959',
      city: 'Parkerberg',
      country: 'VC',
      state: 'Rhode Island',
      postalCode: '44765',
      phoneNumber: '+19476609243',
      email: 'justinwilliams@yahoo.com',
      currency: 'USD',
      dueAmount: 3796.7,
    },
  ];

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
    'btns',
  ];
  constructor() {}
  ngOnInit(): void {}
}
