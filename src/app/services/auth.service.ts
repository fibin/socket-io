import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.interface';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  auth(creds: Auth): Observable<User> {
    return this.httpClient.post("http://localhost:5173/login", creds)
  }

  signup(creds: Auth): Observable<User> {
    return this.httpClient.post("http://localhost:5173/signup", creds)
  }

  logout() {
    return this.httpClient.post("http://localhost:5173/logout", {});
  }
}
