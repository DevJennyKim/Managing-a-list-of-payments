import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'pay-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  standalone: false,
})
export class AddPaymentComponent {
  paymentForm!: FormGroup;
  inputFields = [
    {
      id: 'payee_first_name',
      label: 'First Name',
      placeholder: 'Enter first name',
      type: 'text',
      validations: [Validators.required],
    },
    {
      id: 'payee_last_name',
      label: 'Last Name',
      placeholder: 'Enter last name',
      type: 'text',
      validations: [Validators.required],
    },
    {
      id: 'payee_country',
      label: 'Country',
      placeholder: 'Select country',
      type: 'select',
      items: ['Korea', 'China'],
      validations: [Validators.required],
    },
    {
      id: 'payee_state',
      label: 'State',
      placeholder: 'Select state',
      type: 'select',
      items: [],
      validations: [Validators.required],
    },
    {
      id: 'currency',
      label: 'Currency',
      placeholder: 'Select currency',
      type: 'select',
      items: [],
      validations: [Validators.required],
    },
    {
      id: 'payee_email',
      label: 'Email',
      placeholder: 'Enter email',
      type: 'email',
      validations: [Validators.required, Validators.email],
    },
    {
      id: 'payee_phone_number',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      type: 'text',
      validations: [Validators.required],
    },
    {
      id: 'due_amount',
      label: 'Due Amount',
      placeholder: 'Enter due amount',
      type: 'number',
      validations: [Validators.required, Validators.min(1)],
    },
  ];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.paymentForm = this.fb.group({
      payee_first_name: ['', Validators.required],
      payee_last_name: ['', Validators.required],
      payee_address_line_1: ['', Validators.required],
      payee_city: ['', Validators.required],
      payee_country: ['', Validators.required],
      currency: ['', Validators.required],
      payee_email: ['', [Validators.required, Validators.email]],
      payee_phone_number: ['', Validators.required],
      due_amount: [0, [Validators.required, Validators.min(1)]],
    });
  }
}
