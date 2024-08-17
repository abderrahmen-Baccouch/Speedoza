import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCreationService {
  private apiUrl = 'http://localhost:5100/api/foods'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createFood(formData: FormData): Observable<any> {
    const headers = this.getHeaders(); // Attach the Authorization header
    return this.http.post(`${this.apiUrl}/createFood`, formData, { headers });
  }

  // createFood(formData: FormData): Observable<any> {
  //   const headers = new HttpHeaders(); // No content type needed as we use FormData
  //   return this.http.post(`${this.apiUrl}/createFood`, formData, { headers });
  // }
}
