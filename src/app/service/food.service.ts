import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:5100/api/foods';

  constructor(private http: HttpClient) { }

  // createFood(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/createFood`, formData);
  // }

  // getAllFoods(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/getAllFoods`);
  // }

  createFood(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/createFood`, formData, { headers });
  }

  getAllFoods(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/getAllFoods`, { headers });
  }

}
