import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../http-request/http-request.service';

interface IUser {
  _id: string;
  email: string;
  role: boolean;
  fullname: string;
  isallowedtodelete: boolean;
  isallowedtocreate: boolean;
  isallowedtoupdate: boolean;
  isblock: boolean;
}

interface IResponse {
  success: string;
  data: IUser[];
  code: number;
  message?: {
    error: { message: string };
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private hrs: HttpRequestService
  ) { }

  setToken(data: { account: object[], token: any }) {
    return new Promise((resolve, reject) => {
      try {
        const account = JSON.stringify(data.account);
        const token = data.token;

        localStorage.setItem('account', account)
        localStorage.setItem('token', token)
      } catch (e) {
        console.info(e);
        reject(false);
      } finally {
        resolve(true);
      }
    });
  }

  async checkRole() {
    return new Promise((resolve) => {
      this.hrs.request('get', 'user/userInfo', {}, (response: IResponse) => {
        console.log(response)
        if (response.success) resolve(response.data[0].role);
        else this.router.navigate(['login']);
      })
    })

    // let token = this.getToken();
    // let account = JSON.parse(this.getUserData());

    // if (token) return account.role;
  }

  getToken(): string {
    let token = localStorage.getItem('token');
    return token ? token : '';
  }

  getUserData(): string {
    let account = localStorage.getItem('account');
    return account ? account : '';
  }

  approved(role: string) {
    console.log(role)
    this.router.navigate([role]);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
