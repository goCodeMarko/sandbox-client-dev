import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../authorization/auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorServiceService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Token has been intercepted!");
    const header = req.clone({
      setHeaders: {
        Accept: "application/json",
        Authorization: "Bearer " + this.auth.getToken(),
      },
    });
    return next.handle(header);
  }
}
