import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  request(method: string, endpoint: string, payload: any, callback: any) {
    switch (method) {
      case 'get':
        return this.http.get(`http://localhost:3000/api/${endpoint}`, { params: payload }).subscribe(response => {
          return callback(response)
        });

      case 'post':
        return this.http.post(`http://localhost:3000/api/${endpoint}`, payload).subscribe(response => {
          return callback(response)
        });

      case 'put':
        return this.http.put(`http://localhost:3000/api/${endpoint}`, payload).subscribe(response => {
          return callback(response)
        });
    }
  }
}
