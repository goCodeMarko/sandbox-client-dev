import { Component } from "@angular/core";
import { AuthService } from "../../../authorization/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [],
})
export class AppHeaderComponent {
  account;
  constructor(private auth: AuthService) {
    this.account = JSON.parse(this.auth.getUserData());
  }

  logout() {
    this.auth.logout();
  }
}
