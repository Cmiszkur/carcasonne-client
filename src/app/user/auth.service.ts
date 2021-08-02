import {
  AuthResponse,
  LoginAuthResponse,
  loginUser,
} from '../interfaces/responseInterfaces';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn = false;
  redirectUrl: string | null = null;
  baseUrl = 'http://localhost:3000/';
  authUrl = this.baseUrl + 'restricted';
  loginUrl = this.baseUrl + 'auth/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
    }),
    withCredentials: true,
  };
  usernameError = new BehaviorSubject(false);
  passwordError = new BehaviorSubject(false);
  $usernameError = this.usernameError.asObservable();
  $passwordError = this.passwordError.asObservable();

  async auth(): Promise<boolean> {
    let isAuthenticated = false;
    const response = await this.http
      .get<AuthResponse>(this.authUrl, this.httpOptions)
      .toPromise();
    if (response.statusCode === 200) {
      isAuthenticated = true;
    }
    console.log(response);
    return isAuthenticated;
  }

  login(loginUser: loginUser): Observable<LoginAuthResponse> {
    // let response: LoginAuthResponse;
    this.usernameError.next(false);
    this.passwordError.next(false);

    return this.http
      .post<LoginAuthResponse>(this.loginUrl, loginUser, this.httpOptions)
      .pipe(catchError(this.handleError<LoginAuthResponse>()));
  }

  handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      const errorMessage = error.error;

      if (errorMessage.message === 'password') {
        this.passwordError.next(true);
      }

      if (errorMessage.message === 'username') {
        this.usernameError.next(true);
      }

      return of(errorMessage as T);
    };
  }

  // handleLoginError() {
  //   return (error: HttpErrorResponse) => {
  //     const errorMessage: LoginAuthResponse = error.error;

  //     if (errorMessage.message === 'password') {
  //       this.passwordError.next(true);
  //     }

  //     if (errorMessage.message === 'username') {
  //       this.usernameError.next(true);
  //     }
  //   };
  // }
}
