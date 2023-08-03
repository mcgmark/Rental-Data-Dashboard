import { Injectable } from '@angular/core';
import { UserModel } from '../model/user';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Node/Express API
  private REST_API: string = 'http://localhost:8000/api/auth';

  constructor(private httpClient: HttpClient) { }

  isLoggedIn: boolean = false;
  username: String = '';

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  register(data: UserModel): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, data);
  }

  login(data: UserModel): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, data);
  }

  logout(): Observable<any> {
    let API_URL = `${this.REST_API}/logout`;
    return this.httpClient.post(API_URL, {});
  }
}
