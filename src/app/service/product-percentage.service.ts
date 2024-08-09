import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductPercentage {
  percentage: number;
  description: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductPercentageService {

  private baseUrl = 'http://localhost:5100/api/productPercentages';

  constructor(private http: HttpClient) { }

  createProductPercentage(data: ProductPercentage): Observable<ProductPercentage> {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the header
    });

    return this.http.post<ProductPercentage>(`${this.baseUrl}/create`, data, { headers });
  }
}
