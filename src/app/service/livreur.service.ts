import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private apiUrl = 'http://localhost:5100/api/auth';

  constructor(private http: HttpClient) {}

  createLivreur(livreur: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerLivreur`, livreur);
  }

  getAllLivreurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllLivreurs`);
  }


}
