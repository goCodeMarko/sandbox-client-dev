import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../http-request/http-request.service';

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
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: IUser[] = [];

  constructor(public hrs: HttpRequestService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.hrs.request('get', 'user/getUsers', {}, async (res: IResponse) => {
      this.users = res.data;
      console.log(this.users)
    });
  }
}
