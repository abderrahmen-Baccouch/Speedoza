import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/createClient`, client);
  }

  updateClient(id: string, client: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateClient/${id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteClient/${id}`);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/getAllClients`);
  }

}
