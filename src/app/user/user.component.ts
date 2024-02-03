import { Component, OnInit } from "@angular/core";
import { MenuItems } from "../shared/menu-items/menu-items";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(public menu: MenuItems) {}

  ngOnInit(): void {
    this.menu.setMenuItem([
      {
        main: "user",
        state: "view-users",
        type: "link",
        name: "Users",
        icon: "accessibility ",
      },
      {
        main: "user",
        state: "view-books",
        type: "link",
        name: "Books",
        icon: "auto_stories ",
      },
    ]);
  }
}
