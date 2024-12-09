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

  loadStates(countryCode: string): Observable<any> {
    return this.http.get(
      `https://countriesnow.space/api/v0.1/countries/states?country=${countryCode}`
    );
  }

  loadCurrencies(): Observable<any> {
    return this.http.get('https://api.exchangerate-api.com/v4/latest/USD');
  }
}
