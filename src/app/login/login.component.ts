import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../authorization/auth.service";
import { HttpRequestService } from "../http-request/http-request.service";
import { trigger, style, animate, transition } from "@angular/animations";
interface IUser {
  email: string;
  fullname: string;
  role: string;
  _id: string;
  isblock: boolean;
}

interface IResponse {
  success: string;
  data: { account: any; token: any };
  code: number;
  message?: string;
  error?: {
    message: string;
  };
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  message: string = "";
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private hrs: HttpRequestService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [""],
      password: [""],
    });
  }

  ngOnInit(): void {}

  login() {
    this.hrs.request(
      "post",
      "user/authenticate",
      this.loginForm.value,
      async (data: IResponse) => {
        if (data.success) {
          try {
            await this.auth.setToken(data.data);
            console.log("token has been set!");

            this.auth.navigate(data.data.account.role);
            console.log("User has been navigated!");
          } catch (error) {
            this.message = "Client Error, Please contact your administrator";
            console.error("there's a problem in setting up token!");
          }
        } else if (!data.success) {
          this.message = data.error?.message ?? "";
        }
      }
    );
  }
}
