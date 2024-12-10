import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiResponse } from 'src/app/model/type.model';
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
      placeholder: 'Select a country',
      fieldType: 'country',
      type: 'select',
      items: [] as { id: string; name: string }[],
      validations: [Validators.required],
    },
    {
      id: 'payee_state',
      label: 'State',
      placeholder: 'Select a state',
      type: 'select',
      fieldType: 'state',
      items: [],
      validations: [Validators.required],
    },
    {
      id: 'payee_city',
      label: 'City',
      placeholder: 'Select a city',
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
      payee_state: ['', Validators.required],
      payee_postal_code: ['', Validators.required],
      currency: ['', Validators.required],
      due_amount: [0, [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadCurrencies();
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

  loadStates(countryName: string): void {
    this.apiService.loadStates(countryName).subscribe((response: any) => {
      const stateField = this.inputFields.find(
        (field) => field.id === 'payee_state'
      );

      if (stateField) {
        stateField.items = response.data.states.map((state: any) => ({
          id: state.state_code,
          name: state.name,
        }));
        console.log('stateField: ', stateField?.items);
      }
    });
  }

  loadCities(country: string, state: string): void {
    this.apiService.loadCities(country, state).subscribe((response: any) => {
      const cityField = this.inputFields.find(
        (field) => field.id === 'payee_city'
      );
      if (cityField) {
        cityField.items = response.data.map((city: string) => ({
          id: city,
          name: city,
        }));
      }
    });
  }

  loadCurrencies(): void {
    this.apiService.loadCurrencies().subscribe((response: any) => {
      this.currencies = response.data;

      const currencyField = this.inputFields.find(
        (field) => field.id === 'currency'
      );
      if (currencyField) {
        currencyField.items = this.currencies.map((currency) => ({
          id: currency.currency,
          name: currency.currency,
        }));
      }
    });
  }

  onFieldChange(fieldId: string, event: any): void {
    if (fieldId === 'payee_country') {
      const selectedValue = event;
      this.onCountryChange(selectedValue);
    } else if (fieldId === 'payee_state') {
      const selectedValue = event;
      this.onStateChange(selectedValue);
    }
  }

  onCountryChange(selectedCountryName: string): void {
    this.loadStates(selectedCountryName);

    const selectedCountry = this.countries.find(
      (country) => country.country === selectedCountryName
    );

    if (selectedCountry) {
      const matchingCurrency = this.currencies.find(
        (currency) => currency.iso2 === selectedCountry.iso2
      );
      if (matchingCurrency) {
        this.paymentForm.get('currency')?.setValue(matchingCurrency.currency);
      } else {
        this.paymentForm.get('currency')?.reset();
      }
    }

    if (this.paymentForm.get('payee_state')?.value) {
      this.loadCities(
        selectedCountryName,
        this.paymentForm.get('payee_state')?.value
      );
    }
  }

  onStateChange(selectedState: string): void {
    const country = this.paymentForm.get('payee_country')?.value;
    if (country && selectedState) {
      this.loadCities(country, selectedState);
    }
  }

  getControl(fieldId: string): FormControl {
    const control = this.paymentForm.get(fieldId);
    if (!control) {
      console.error(`FormControl with id "${fieldId}" not found.`);
    }
    return control as FormControl;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.apiService.postPaymentRecord(this.paymentForm.value).subscribe(
        (response: ApiResponse) => {
          console.log('Payment created successfully!', response.inserted_id);
        },
        (error) => {
          console.error('Error creating payment:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.paymentForm.controls).forEach((key) => {
      this.paymentForm.get(key)?.markAsTouched();
    });
  }
}
