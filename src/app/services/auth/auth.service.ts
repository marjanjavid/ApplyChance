import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = "https://api.applychance.com/api/auth";
  constructor(private http: HttpClient, private _errorService: ErrorService) { }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
  login() {
    var userInfo = {
      "username": "a.nikzad91@gmail.com",
      "password": "12345678"
    };
    return this.http.post<any>(this.apiUrl, userInfo)
      .pipe(catchError(this._errorService.handleError))
  }
}
