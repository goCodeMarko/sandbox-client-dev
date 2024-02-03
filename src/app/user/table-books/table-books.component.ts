import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PopUpModalComponent } from "../../modals/pop-up-modal/pop-up-modal.component";
import { HttpRequestService } from "../../http-request/http-request.service";
import { EditBookComponent } from "../../modals/edit-book/edit-book.component";
interface IBooks {
  author: string;
  stocks: number;
  isdeleted: boolean;
  _id: string;
  title: string;
  price: number;
}

interface IResponse {
  success: string;
  data: IBooks[];
  code: number;
  message: string;
}

@Component({
  selector: "app-table-books",
  templateUrl: "./table-books.component.html",
  styleUrls: ["./table-books.component.css"],
})
export class TableBooksComponent implements OnInit, OnChanges {
  @Input() books: IBooks[] = [];
  @Input() totalCount = 0;
  @Input() totalPages = 0;
  @Input() currentPage = 0;
  @Output() next = new EventEmitter<object>();
  @Output() previous = new EventEmitter<object>();
  public filters = {
    search: "",
    dateStart: "",
    dateEnd: "",
    skip: 0,
    limit: 5,
  };

  constructor(private dialog: MatDialog, private hrs: HttpRequestService) {}

  ngOnInit(): void {
    console.log(34545, this.books);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  emitNext() {
    if (this.currentPage < this.totalPages) {
      this.filters.skip += 5;

      this.next.emit(this.getFilters);
    }
  }

  emitPrev() {
    if (this.filters.skip > 0) {
      this.filters.skip -= 5;

      this.previous.emit(this.getFilters);
    }
  }

  get getFilters() {
    return this.filters;
  }

  openDeleteModal(id: string) {
    this.dialog
      .open(PopUpModalComponent, {
        width: "350px",
        data: {
          deletebutton: true,
          title: "You're about to delete a book",
          message:
            "This will <b>delete the book from the database</b> <br> are you sure about it?",
        },
      })
      .componentInstance.result.subscribe((data: boolean) => {
        if (data) this.deleteBook(id);
      });
  }

  openEditModal(book: object) {
    this.dialog
      .open(EditBookComponent, {
        width: "500px",
        data: {
          data: book,
        },
      })
      .componentInstance.result.subscribe(
        (newData: { save: boolean; newData: object }) => {
          if (newData.save) this.editBook(book, newData);
        }
      );
  }

  private editBook(oldData: any, newData: any) {
    this.hrs.request(
      "put",
      "book/editBook",
      { oldData, newData },
      async (data: IResponse) => {
        if (data.success) {
          this.editCurrentBookInTable(oldData._id, newData);
        } else {
          if (data.message == "Restricted") {
            this.dialog.open(PopUpModalComponent, {
              width: "500px",
              data: {
                deletebutton: false,
                title: "Access Denied",
                message:
                  "Oops, It looks like you <b>dont have access</b> on this feature.",
              },
            });
          }
        }
      }
    );
  }

  private deleteBook(id: string) {
    this.hrs.request(
      "put",
      "book/deleteBook",
      { id },
      async (data: IResponse) => {
        if (data.success) {
          this.deleteCurrentBookInTable(id);
        } else {
          if (data.message == "Restricted") {
            this.dialog.open(PopUpModalComponent, {
              width: "500px",
              data: {
                deletebutton: false,
                title: "Access Denied",
                message:
                  "Oops, It looks like you <b>dont have access</b> on this feature.",
              },
            });
          }
        }
      }
    );
  }

  private deleteCurrentBookInTable(id: string) {
    this.books.splice(
      this.books.findIndex((book) => book._id == id),
      1
    );
  }

  private editCurrentBookInTable(id: string, edited: any) {
    this.books.forEach((data, i) => {
      if (data._id == id) {
        this.books[i].author = edited.updateddata.author;
        this.books[i].title = edited.updateddata.title;
        this.books[i].stocks = edited.updateddata.stocks;
        this.books[i].price = edited.updateddata.price;
      }
    });
  }
}
