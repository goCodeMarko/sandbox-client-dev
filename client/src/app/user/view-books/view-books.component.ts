import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from '../../http-request/http-request.service';
import { AddBookComponent } from '../../modals/add-book/add-book.component';
import { PopUpModalComponent } from '../../modals/pop-up-modal/pop-up-modal.component';
import { saveAs } from 'file-saver';

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
  data: {
    data: IBooks[];
    counts: number;
    pages: number;
  };
  code: number;
  message: string;
}
@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {
  books: IBooks[] = [];
  counts = 0;
  pages = 0;
  pdfbtn = false;
  xlsxbtn = false;
  qrBtn = false;
  public_id = '';
  img= '';
  qrCodeUrl = '';
  constructor(public hrs: HttpRequestService, private dialog: MatDialog) {
 
   }

  ngOnInit(): void {
    this.getBooks({
      search: '',
      dateStart: '',
      dateEnd: '',
      skip: 0,
      limit: 2
    });
  }

  public getBooks(filters = {}) {
    console.log(filters);
    this.hrs.request('get', 'book/getBooks', filters , async (res: IResponse) => {
      console.log(res)
      this.books = res.data.data;
      this.counts = res.data.counts;
      this.pages = res.data.pages;
    });
  }

  openAddBookModal() {
    this.dialog.open(AddBookComponent, { width: '500px' }).componentInstance.result.subscribe((data: any) => {
      this.addBook(data.data)
    })
  }

  private viewBook(data: object) {
    this.hrs.request('get', 'book/addBook', { params: { _id: '61f11c3e78a00d0f84df09e2' } }, async (data: IResponse) => {
      if (data.success) {
        this.addInCurrentUserTable(data);
      } else {
        if (data.message == 'Restricted') { 
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
    this.hrs.request('post', 'book/addBook', data, async (data: IResponse) => {
      if (data.success) {
        this.addInCurrentUserTable(data);
      } else {
        if (data.message == 'Restricted') { 
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

  public generateQRCode() {
    this.qrBtn = true;
    this.hrs.request('get', 'user/generateQR', { }, async (res: any) => {
      this.public_id = res.data.public_id;
      console.log(this.public_id)
      this.qrCodeUrl = await this.getQRCodeImage();

      this.qrBtn = false;
    })
  }

  private getQRCodeImage(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.hrs.request('get', 'user/getFile', { public_id: this.public_id }, async (res: any) => {
        const url: string = res.data;

        resolve(url);
      })
    })
  }
  
  public downloadPDF() {
    this.pdfbtn = true;

    this.hrs.request('get', 'user/downloadPDF', { public_id: this.public_id }, async (res: any) => {
      const url = res.data.url;
      const filename = `QRCODE_${res.data.created_at}.${res.data.format}`;
      console.log(url)
      saveAs(url, filename);
      this.pdfbtn = false;
    })
  }

  public downloadXLSX() {
    this.xlsxbtn = true;

    this.hrs.request('get', 'user/downloadExcel', { public_id: this.public_id}, async (res: any) => {
      console.log(res)
      const url = res.data.url;
      const filename = `XLSX_${res.data.created_at}.${res.data.format}`;

      saveAs(url, filename);
      this.xlsxbtn = false;
    })
  }

}
