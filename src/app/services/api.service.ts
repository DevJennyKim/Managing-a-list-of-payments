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
}
