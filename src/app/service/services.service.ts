import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5100/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginAdmin`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); 
    this.loggedIn.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
