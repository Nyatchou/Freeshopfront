import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as URLS from '../../app/commons/url_backend';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  user: User;
  errors: any;
  tokenAuthSubject: Subject<string> = new Subject();
  accessToken: string;
  refreshToken: string;


  constructor(private http: HttpClient) { }

  async login(userName: string, passWord: string): Promise<any> {
    const response = await this.http
      .post<any>(URLS.LOGIN_URL, {
        login_text: userName,
        password: passWord,
      })
      .toPromise();
    console.log(response);
    return response;

  }

  async signUp(
    userName: string,
    passWord: string,
    firstname: string,
    lastname: string,
    mail: string,
  ): Promise<any> {
    const response = await this.http
      .post<any>(URLS.SIGNUP_URL, {
        username: userName,
        password: passWord,
        first_name: firstname,
        last_name: lastname,
        email: mail
      })
      .toPromise();
    console.log(response);
    return response;
  }

  async logout(): Promise<void>{
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.errors = null;
  }

}
