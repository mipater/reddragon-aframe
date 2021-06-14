// @ts-nocheck
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, tap, concatMap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

interface AuthRefreshTokenResponseData {
  accessToken: string;
  expiresIn: boolean;
  tokenType: string;
  refreshToken: string;
  idToken: string;
  userId: string;
  projectId: string;
}

interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private refreshToken: string;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMD4sLQJhALQfMlv7-rVM74t6Tlx4eAhE',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData)
        this.refreshToken = resData.refreshToken;
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }),
    );
  }

  autoLogin() {
    const userData: UserData = this.getUserData();

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.http.post<AuthRefreshTokenResponseData>('https://securetoken.googleapis.com/v1/token?key=AIzaSyCMD4sLQJhALQfMlv7-rVM74t6Tlx4eAhE&grant_type=refresh_token&refresh_token='+this.refreshToken)
        .pipe(
          tap(resData => {
            this.refreshToken = resData.refreshToken;
            const oldUser: UserData = this.getUserData();
            const newUser = new User(
              oldUser.email,
              oldUser.userId,
              resData.idToken,
              new Date(resData.expirationDate)
            );
            localStorage.setItem('userData', JSON.stringify(newUser));
            this.user.next(newUser);
            if (this.router.url.indexOf('/aframe') < 0 || this.router.url.indexOf('/gallery') < 0) {
              this.logout();
            } else {
              clearTimeout(this.tokenExpirationTimer);
            }
          })
        )
    }, expirationDuration-60);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }
    return throwError(errorMessage);
  }

  private getUserData(): UserData {
    return JSON.parse(localStorage.getItem('userData'));
  }

}
