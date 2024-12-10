import { Component } from '@angular/core';
import { phoneNumberValidator } from 'src/app/validators/phone-number.validator';
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
  infoFields = [
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
      tooltip: 'ⓘ Please enter phone number in the format: +1 408 555 1234',
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
      id: 'payee_province_or_state',
      label: 'State',
      placeholder: 'Select a state',
      type: 'select',
      fieldType: 'state',
      items: [],
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
  ];
  paymentFields = [
    {
      id: 'payee_due_date',
      label: 'Due Date',
      placeholder: 'Choose the date',
      type: 'date',
      validations: [Validators.required],
    },
    {
      id: 'discount_percent',
      label: 'Discount Percentage',
      placeholder: 'Enter discount percentage',
      type: 'number',
      validations: [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ],
    },
    {
      id: 'tax_percent',
      label: 'Tax Percentage',
      placeholder: 'Enter tax percentage',
      type: 'number',
      validations: [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ],
    },
    {
      id: 'due_amount',
      label: 'Due Amount',
      placeholder: 'Enter due amount',
      type: 'number',
      validations: [Validators.required, Validators.min(1)],
    },
    {
      id: 'payee_payment_status',
      label: '',
      placeholder: 'Pending',
      type: 'hidden',
      value: 'pending',
      validations: [Validators.required],
    },
    {
      id: 'payee_added_date_utc',
      label: 'Added Date',
      type: 'hidden',
      value: new Date().toISOString(),
      validations: [Validators.required],
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
      payee_phone_number: ['', [Validators.required, phoneNumberValidator]],
      payee_address_line_1: ['', Validators.required],
      payee_address_line_2: [''],
      payee_city: ['', Validators.required],
      payee_country: ['', Validators.required],
      payee_province_or_state: [''],
      payee_postal_code: ['', Validators.required],
      currency: ['', Validators.required],
      payee_payment_status: ['pending', Validators.required],
      payee_due_date: ['', Validators.required],
      discount_percent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      tax_percent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      due_amount: [0, [Validators.required, Validators.min(0.01)]],
      payee_added_date_utc: new Date().toISOString(),
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadCurrencies();
  }

  loadCountries(): void {
    this.apiService.loadCountries().subscribe((response: any) => {
      this.countries = response.data;

      const countryField = this.infoFields.find(
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
      const stateField = this.infoFields.find(
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
      const cityField = this.infoFields.find(
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

      const currencyField = this.infoFields.find(
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
      const formData = { ...this.paymentForm.value };

      formData.discount_percent = parseFloat(
        (formData.discount_percent || 0).toFixed(2)
      );
      formData.tax_percent = parseFloat((formData.tax_percent || 0).toFixed(2));
      formData.due_amount = parseFloat((formData.due_amount || 0).toFixed(2));
      formData.payee_phone_number = formData.payee_phone_number
        .trim()
        .replace(/^\+/, '');
      formData.payee_due_date = this.formatDate(formData.payee_due_date);

      const countryName = formData.payee_country;

      this.convertCountryNameToIso2(countryName).then((iso2) => {
        if (iso2) {
          formData.payee_country = iso2;

          this.apiService.postPaymentRecord(formData).subscribe(
            (response: ApiResponse) => {
              console.log(
                'Payment created successfully!',
                response.inserted_id
              );
            },
            (error) => {
              console.error('Error creating payment:', error);
            }
          );
        } else {
          console.error('Could not convert country name to ISO2');
        }
      });
    } else {
      console.error('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  convertCountryNameToIso2(countryName: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.apiService.loadCountries().subscribe(
        (response: any) => {
          const countries = response.data;
          const matchedCountry = countries.find(
            (country: any) => country.country === countryName
          );
          console.log('matchedCountry', matchedCountry);

          resolve(matchedCountry ? matchedCountry.iso2 : null);
        },
        (error) => {
          console.error('Error fetching countries:', error);
          reject(null);
        }
      );
    });
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.paymentForm.controls).forEach((key) => {
      const control = this.paymentForm.get(key);
      if (control?.invalid) {
        console.log(`${key} is invalid:`, control.errors);
      }
    });
  }
}
