import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { ToastrService } from 'ngx-toastr';

interface IAuthResponse {
  auth_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login({password, email}: { password: string, email: string }): Observable<null> {
    return this.http
      .post<IAuthResponse>(`${environment.api}/auth/token/login/`, {password, email})
      .pipe(
        tap(
          next => {
            if (next && next.auth_token) {
              localStorage.setItem('currentUser', JSON.stringify(next));
              this.currentUserSubject.next(next);

              this.toastr.success('Login successful');
            }
          }
        ),
        map(
          () => null
        )
      );
  }

  register({password, email}: { password: string, email: string }): Observable<null> {
    return this.http
      .post<IAuthResponse>(`${environment.api}/auth/users/`, {password, email})
      .pipe(
        tap(
          next => {
              this.toastr.info('Registration successful.');
          }
        ),
        map(
          () => null
        )
      );
  }

  deleteAccount({password}: {password: string}): Observable<null> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        password
      }
    };

    return this.http
      .delete<{}>(`${environment.api}/users/me/`, options)
      .pipe(
        tap(
          () => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            this.toastr.info('Your account has been deleted');
          }
        ),
        map(
          () => null
        )
      );
  }

  logout(): Observable<null> {
    return this.http
      .post(`${environment.api}/auth/token/logout/`, '')
      .pipe(
        tap(
          () => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            this.toastr.info('You have been logged out');
          }
        ),
        map(
          () => null
        )
      );
  }
}
