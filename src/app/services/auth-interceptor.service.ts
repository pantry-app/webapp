import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.auth_token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Token ${currentUser.auth_token}`)
      });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }

}
