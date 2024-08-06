import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private apiUrl = 'http://localhost:5100/api/auth';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createLivreur(livreur: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/registerLivreur`, livreur, { headers });
  }

  getAllLivreurs(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/getAllLivreurs`, { headers });
  }
}
