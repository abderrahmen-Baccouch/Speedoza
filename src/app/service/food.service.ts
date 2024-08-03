import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:5100/api/foods';

  constructor(private http: HttpClient) { }

  createFood(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createFood`, formData);
  }

  getAllFoods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllFoods`);
  }
}
