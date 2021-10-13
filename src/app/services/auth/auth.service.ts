import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { JwtResponse } from './jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private _router: Router, private jwtHelper: JwtHelperService) { }

  authSubject = new BehaviorSubject(false);

  signIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${environment.server}/users`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res != undefined) {
          this.authSubject.next(true);
          return res;
        } else {
          alert('Usuario incorrecto');
        }
      })
    );
  }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${environment.server}/users/register`, user).pipe(
      tap(async (res: JwtResponse) => {

        if (res != undefined) {
          this.authSubject.next(true);
          return res;
        } else {
          alert('Usuario incorrecto');
        }
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
    this._router.navigate(['/login'])
  }
}
