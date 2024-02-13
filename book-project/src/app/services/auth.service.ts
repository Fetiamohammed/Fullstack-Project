import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Register } from '../models/register.model';
import { Login } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://booksandusersapi.azurewebsites.net';
  isAuthenticated: boolean = false;
  userPayload: any;

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      this.isAuthenticated = this.checkAuthentication();
    }
  }

  checkAuthentication(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  register(user: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Users`, user);
  }

  login(credentials: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Auth/login`, credentials).pipe(
      tap(() => {

        this.isAuthenticated = true;
      })
    );
  }

  logout(): void {

    this.isAuthenticated = false;
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
