import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../http-request/http-request.service';
import { EditSessionHandlingComponent } from '../../modals/edit-session-handling/edit-session-handling.component';

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
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit, OnChanges {
  @Input() users: IUser[] = [];

  constructor(private dialog: MatDialog, private hrs: HttpRequestService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  openEditSessionModal(user: object) {
    this.dialog.open(EditSessionHandlingComponent, {
      width: '300px',
      data: user
    }).componentInstance.result.subscribe((editedSession: object) => {
      this.editUser(editedSession)
    })
  }

  private editUser(editedSession: object) {
    this.hrs.request('put', 'user/updateUserAccess', { editedSession }, async (data: IResponse) => {
      if (data.success) this.editCurrentUser(editedSession);
    })
  }

  editCurrentUser(edited: any) {
    this.users.forEach((data, i) => {
      if (data._id === edited._id) {
        this.users[i].isallowedtocreate = edited.isallowedtocreate;
        this.users[i].isallowedtodelete = edited.isallowedtodelete;
        this.users[i].isallowedtoupdate = edited.isallowedtoupdate;
        this.users[i].isblock = edited.isblock;
      }
    })
  }

}
