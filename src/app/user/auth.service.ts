import { Constants } from './../constants/httpOptions';
import { AuthResponse, LoginAuthResponse, loginUser } from '../interfaces/responseInterfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public redirectUrl: string | null = null;
  private authUrl = Constants.baseUrl + 'restricted';
  private loginUrl = Constants.baseUrl + 'users/login';

  async auth(): Promise<boolean> {
    return this.http
      .get<AuthResponse>(this.authUrl, Constants.httpOptions)
      .toPromise()
      .then(
        response => {
          console.log(response);
          return true;
        },
        e => {
          console.log(e);
          return false;
        }
      );
  }

  login(loginUser: loginUser): Observable<LoginAuthResponse> {
    return this.http
      .post<LoginAuthResponse>(this.loginUrl, loginUser, Constants.httpOptions)
      .pipe(catchError(this.handleError<LoginAuthResponse>()));
  }

  handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(error);
      const errorMessage = error.error;
      return of(errorMessage as T);
    };
  }
}
