import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCreationService {
  private apiUrl = 'http://localhost:5100/api/foods'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createFood(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); // No content type needed as we use FormData
    return this.http.post(`${this.apiUrl}/createFood`, formData, { headers });
  }
}
