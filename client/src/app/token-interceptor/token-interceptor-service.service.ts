import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = this.injector.get(AuthService);

    let header = req.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: auth.getToken()
      }
    })
    return next.handle(header)
  }
}
