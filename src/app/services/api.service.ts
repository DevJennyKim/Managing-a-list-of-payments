import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentRecord, ApiResponse } from '../model/type.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getPaymentRecord(page: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/payments?page=${page}&limit=${limit}`
    );
  }

  postPaymentRecord(payment: PaymentRecord): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/payments`, payment);
  }

  deletePaymentRecord(paymentId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.apiUrl}/payments/${paymentId}`
    );
  }

  uploadEvidence(paymentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(
      `${this.apiUrl}/upload_evidence/${paymentId}`,
      formData
    );
  }

  updatePaymentRecord(payment: PaymentRecord): Observable<ApiResponse> {
    const body = {
      payee_due_date: payment.payee_due_date,
      due_amount: payment.due_amount,
      payee_payment_status: payment.payee_payment_status,
    };
    return this.http.put<any>(`${this.apiUrl}/payments/${payment._id}`, body);
  }

  downloadEvidence(paymentId: string): Observable<any> {
    return this.http.get<Blob>(
      `${this.apiUrl}/download_evidence/${paymentId}`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }

  loadCountries(): Observable<any> {
    return this.http.get('https://countriesnow.space/api/v0.1/countries');
  }

  loadStates(countryName: string): Observable<any> {
    const body = {
      country: countryName,
    };
    return this.http.post(
      `https://countriesnow.space/api/v0.1/countries/states`,
      body
    );
  }

  loadCities(countryCode: string, state: string): Observable<any> {
    const body = {
      country: countryCode,
      state: state,
    };
    return this.http.post(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      body
    );
  }

  loadCurrencies(): Observable<any> {
    return this.http.get(
      'https://countriesnow.space/api/v0.1/countries/currency'
    );
  }
}
