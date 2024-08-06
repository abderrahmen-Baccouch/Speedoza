import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services.service'; 

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient, private authService: AuthService) {} 

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createClient(client: Client): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/createClient`, client, { headers });
  }

  updateClient(id: string, client: Client): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/updateClient/${id}`, client, { headers });
  }

  deleteClient(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/deleteClient/${id}`, { headers });
  }

  getAllClients(): Observable<Client[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Client[]>(`${this.apiUrl}/getAllClients`, { headers });
  }
}
