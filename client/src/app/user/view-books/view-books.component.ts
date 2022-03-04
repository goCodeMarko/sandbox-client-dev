import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../http-request/http-request.service';
import { AddBookComponent } from '../../modals/add-book/add-book.component';
import { PopUpModalComponent } from '../../modals/pop-up-modal/pop-up-modal.component';

interface IBooks {
  author: string;
  stocks: string;
  isdeleted: boolean;
  _id: string;
  title: string;
  date: string;
}

interface IResponse {
  success: string;
  data: IBooks[];
  code: number;
  message?: {
    error: { message: string };
  };
}
@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {
  books: IBooks[] = [];
  constructor(public hrs: HttpRequestService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.hrs.request('get', 'book/allBooks', {}, async (res: IResponse) => {
      this.books = res.data;
      console.log(this.books)
    });
  }

  openAddBookModal() {
    this.dialog.open(AddBookComponent, { width: '500px' }).componentInstance.result.subscribe((data: any) => {
      console.log(data)
      this.addBook(data.data)
    })
  }

  private viewBook(data: object) {
    console.log('for boooody', data)
    this.hrs.request('get', 'book/addBook', { params: { _id: '61f11c3e78a00d0f84df09e2' } }, async (data: IResponse) => {
      if (data.success) {
        this.addInCurrentUserTable(data);
      } else {
        if (data.message?.error.message == 'Restricted') {
          this.dialog.open(PopUpModalComponent, {
            width: '500px',
            data: {
              deletebutton: false,
              title: "Access Denied",
              message: 'Oops, It looks like you <b>dont have access</b> on this feature.'
            }
          })
        }
      }
    })
  }

  private addBook(data: object) {
    console.log('for boooody', data)
    this.hrs.request('post', 'book/addBook', data, async (data: IResponse) => {
      if (data.success) {
        this.addInCurrentUserTable(data);
      } else {
        if (data.message?.error.message == 'Restricted') {
          this.dialog.open(PopUpModalComponent, {
            width: '500px',
            data: {
              deletebutton: false,
              title: "Access Denied",
              message: 'Oops, It looks like you <b>dont have access</b> on this feature.'
            }
          })
        }
      }
    })
  }

  private addInCurrentUserTable(newBook: any) {
    this.books.unshift(newBook.data)
    console.log(newBook)
    console.log(this.books)
  }

}
