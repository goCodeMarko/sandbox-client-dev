import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../authorization/auth.service';
import { HttpRequestService } from '../http-request/http-request.service';

interface IUser {
  email: string;
  fullname: string;
  role: string;
  _id: string;
  isblock: boolean;
}

interface IResponse {
  success: string;
  data: { account: any, token: any };
  code: number;
  message?: string;
  error?: {
    message: string;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = "";
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private hrs: HttpRequestService, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.hrs.request('post', 'user/authenticate', this.loginForm.value, async (data: IResponse) => {
      if (data.success) {
        if (await this.auth.setToken(data.data)) {
          this.auth.approved(data.data.account.role);
          console.log('success')
        } else {
          this.message = 'Server Error, Please contact your administrator';
        }
      } else {
        this.message = data.message || '';
      }
    });
  }
}
