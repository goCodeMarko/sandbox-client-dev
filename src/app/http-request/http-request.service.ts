import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import "rxjs/add/operator/catch";

@Injectable({
  providedIn: "root",
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  request(method: string, endpoint: string, payload: any, callback: any) {
    switch (method) {
      case "download":
        return this.http
          .get(`${environment.SERVER_URL}${endpoint}`, {
            params: payload,
            observe: "events",
            responseType: "blob",
            reportProgress: true,
          })
          .subscribe(
            (response) => {
              return callback(response);
            },
            (error) => {
              return callback(error.error);
            }
          );
      case "get":
        return this.http
          .get(`${environment.SERVER_URL}${endpoint}`, {
            params: payload,
          })
          .subscribe(
            (response) => {
              return callback(response);
            },
            (error) => {
              return callback(error.error);
            }
          );

      case "post":
        return this.http
          .post(`${environment.SERVER_URL}${endpoint}`, payload)
          .subscribe(
            (response) => {
              return callback(response);
            },
            (error) => {
              return callback(error.error);
            }
          );

      case "put":
        return this.http
          .put(`${environment.SERVER_URL}${endpoint}`, payload)
          .subscribe(
            (response) => {
              return callback(response);
            },
            (error) => {
              return callback(error.error);
            }
          );
    }
  }
}
