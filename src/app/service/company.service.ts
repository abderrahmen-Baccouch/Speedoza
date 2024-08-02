import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:5100/api/auth'; 

  constructor(private http: HttpClient) { }

  createCompany(companyData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerCompany`, companyData);
  }

  updateCompany(id: string, companyData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCompany/${id}`, companyData);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCompany/${id}`);
  }
}
