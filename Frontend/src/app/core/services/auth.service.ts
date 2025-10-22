import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, Usuario } from '@/core/models/auth.model';

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // LINK DA API

  private http = inject(HttpClient);

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthenticatedUser(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`, {headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
}