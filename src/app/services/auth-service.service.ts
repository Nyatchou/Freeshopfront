import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as URLS from '../../app/commons/url_backend';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  tokenAuthSubject: Subject<string> = new Subject();
  accessToken: string;
  refreshToken: string;
  errors: { [key: string]: any };

  constructor(private http: HttpClient, private router: Router) {
    // const tokenInStorage = localStorage.getItem('token');
    // if (tokenInStorage){
    //   this.tokenAuthSubject.next(tokenInStorage);
    // }
  }

  getToken(): string {
    return localStorage.getItem('access');
  }

  async login(userName: string, passWord: string): Promise<any> {
    const response = await this.http
      .post<any>(URLS.LOGIN_URL, {
        login_text: userName,
        password: passWord,
      })
      .toPromise();
    return response;
  }

  async signUp(
    userName: string,
    passWord: string,
    firstname: string,
    lastname: string,
    mail: string
  ): Promise<any> {
    const response = await this.http
      .post<any>(URLS.SIGNUP_URL, {
        username: userName,
        password: passWord,
        first_name: firstname,
        last_name: lastname,
        email: mail,
      })
      .toPromise();
    return response;
  }

  setUser(
    userName: string,
    passWord: string,
    firstname: string,
    lastname: string,
    mail: string
  ): void {
    this.user = new User(userName, passWord, firstname, lastname, mail);
  }

  async signUpActivate(userId: string, activationCode: string): Promise<any> {
    const response = await this.http
      .post<any>(URLS.SIGNUP_ACTIVATE_URL, {
        user_id: userId,
        code: activationCode,
      })
      .toPromise();
    return response;
  }

  async signUpResendCode(mail: string): Promise<any> {
    const response = await this.http
      .post<any>(URLS.SIGNUP_ACTIVATE_URL, {
        email: mail,
      })
      .toPromise();
    return response;
  }
  async logout(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    this.errors = null;
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['/signin']);
  }

  setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.tokenAuthSubject.next(access);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  refreshingToken(): void {
    this.http
      .post<any>(URLS.REFRESH_TOKEN_URL, {
        refresh: this.refreshToken,
      })
      .toPromise()
      .then((res) => {
        this.tokenAuthSubject.next(res.access);
        this.accessToken = res.access;
        localStorage.setItem('access', res.access);
      })
      .catch((err) => {
        // localStorage.removeItem('access');
        // localStorage.removeItem('refresh');
      });
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<{ [key: string]: any }>(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
