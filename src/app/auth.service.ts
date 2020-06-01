import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private _http : HttpClient) { }

  registerUser(user){
    return this._http.post<any>(this._registerUrl,user);
  }

  loginUser(user){
    return this._http.post<any>(this._loginUrl,user);
  }

  loggedIn()
  {
    return !!localStorage.getItem('token');
    // double negate the return value. will return only when a token is present in local storage. will be used by the auth guard 
  }
}
