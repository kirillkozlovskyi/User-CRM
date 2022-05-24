import { Injectable } from '@angular/core';
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get isAuthenticated() {
    return !!this.token;
  }
  get token(): String | null {
    return this._token;
  }

  set token(value: String | null) {
    this._token = value;
  }
  private _isAuthenticated: boolean = false;
  private _token: String | null =  null;
  constructor(private http: HttpClient) {
  }
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token)
        }
      ),
    );
  }
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  }
}
