import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:5100/api/auth';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createCompany(companyData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/registerCompany`, companyData, { headers });
  }

  updateCompany(id: string, companyData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/updateCompany/${id}`, companyData, { headers });
  }

  deleteCompany(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/deleteCompany/${id}`, { headers });
  }

  getAllCompanies(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/getAllCompanies`, { headers });
  }
}
