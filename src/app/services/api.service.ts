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
      `${this.apiUrl}?page=${page}&limit=${limit}`
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
