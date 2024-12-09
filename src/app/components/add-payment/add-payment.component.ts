import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      id: 'payee_phone_number',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      type: 'text',
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
      id: 'payee_address_line_1',
      label: 'Address Line 1',
      placeholder: 'Enter Address',
      type: 'text',
      validations: [Validators.required],
    },
    {
      id: 'payee_address_line_2',
      label: 'Address Line 2 (option)',
      placeholder: 'Enter Address',
      type: 'text',
    },
    {
      id: 'payee_country',
      label: 'Country',
      placeholder: 'Select country',
      type: 'select',
      items: [] as { id: string; name: string }[],
      validations: [Validators.required],
    },
    {
      id: 'payee_city',
      label: 'City',
      placeholder: 'Select city',
      type: 'select',
      items: [],
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
      id: 'payee_postal_code',
      label: 'Postal Code',
      placeholder: 'Enter postal code',
      type: 'text',
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
      id: 'due_amount',
      label: 'Due Amount',
      placeholder: 'Enter due amount',
      type: 'number',
      validations: [Validators.required, Validators.min(1)],
    },
  ];

  countries: any[] = [];
  states: any[] = [];
  currencies: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.paymentForm = this.fb.group({
      payee_first_name: ['', Validators.required],
      payee_last_name: ['', Validators.required],
      payee_email: ['', [Validators.required, Validators.email]],
      payee_phone_number: ['', Validators.required],
      payee_address_line_1: ['', Validators.required],
      payee_address_line_2: [''],
      payee_city: ['', Validators.required],
      payee_country: ['', Validators.required],
      payee_status: ['', Validators.required],
      payee_postal_code: ['', Validators.required],
      currency: ['', Validators.required],
      due_amount: [0, [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadCountries();
  }

  loadCountries(): void {
    this.apiService.loadCountries().subscribe((response: any) => {
      this.countries = response.data;
      const countryField = this.inputFields.find(
        (field) => field.id === 'payee_country'
      );

      if (countryField) {
        countryField.items = this.countries.map((country) => ({
          id: country.iso2,
          name: country.country,
        }));
      }
    });
  }
  loadStates(countryCode: string): void {
    this.apiService.loadStates(countryCode).subscribe((response: any) => {
      this.states = response.data.states;
      const stateField = this.inputFields.find(
        (field) => field.id === 'payee_state'
      );
      console.log('states', this.states);

      if (stateField) {
        stateField.items = this.states.map((state) => ({
          id: state.code,
          name: state.name,
        }));
      }
    });
  }
  onFieldChange(fieldId: string, event: any): void {
    const selectedValue = event.value;
    if (fieldId === 'payee_country') {
      this.onCountryChange(selectedValue);
    }
  }

  onCountryChange(event: any): void {
    const selectedCountry = event.value;
    this.loadStates(selectedCountry);
  }

  getControl(fieldId: string): FormControl {
    return this.paymentForm.get(fieldId) as FormControl;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Form Data:', this.paymentForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
