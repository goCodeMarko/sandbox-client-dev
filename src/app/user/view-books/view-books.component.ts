import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  Renderer2,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HttpRequestService } from "../../http-request/http-request.service";
import { AddBookComponent } from "../../modals/add-book/add-book.component";
import { PopUpModalComponent } from "../../modals/pop-up-modal/pop-up-modal.component";
import { trigger, style, animate, transition } from "@angular/animations";

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
    items: IBooks[];
    meta: {
      total: number;
      limit: number;
      page: number;
      pages: number;
    };
  };
  code: number;
  message: string;
}
@Component({
  selector: "app-view-books",
  templateUrl: "./view-books.component.html",
  styleUrls: ["./view-books.component.css"],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ViewBooksComponent implements OnInit {
  books: IBooks[] = [];
  counts = 0;
  pages = 0;
  currentPage = 0;
  pdfbtn = false;
  excelbtn = false;
  qrBtn = false;
  barcodeBtn = false;
  idCardBtn = false;
  img = "";
  qrCodeUrl = "";
  barcodeUrl = "";
  idCard = {
    front: { secure_url: "", public_id: "", format: "" },
    back: { secure_url: "", public_id: "", format: "" },
  };
  selected = ["f1_001", "f1_002"];

  constructor(
    public hrs: HttpRequestService,
    private dialog: MatDialog,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getBooks({
      search: "",
      dateStart: "",
      dateEnd: "",
      skip: 0,
      limit: 10,
    });

    /*
    this.selected.forEach((id) => {
      const el = this.el.nativeElement.querySelector("#" + id);
      this.renderer.setAttribute(el, "status", "1");
      this.renderer.setStyle(el, "fill", "red");
    });
    */
  }

  change(event: any) {
    const selected_id = event.target.id;
    const el = this.el.nativeElement.querySelector("#" + selected_id);
    const status = Number(el.getAttribute("status"));

    if (status === 0 || !status) {
      this.renderer.setAttribute(el, "status", "1");
      this.renderer.setStyle(el, "fill", "red");
      this.selected.push(selected_id);
    } else if (status === 1) {
      this.selected = this.selected.filter((id) => id !== selected_id);
      this.renderer.setAttribute(el, "status", "0");
      this.renderer.setStyle(el, "fill", "black");
    }

    console.log(this.selected);
  }

  public getBooks(filters = {}) {
    this.hrs.request(
      "get",
      "book/getBooks",
      filters,
      async (res: IResponse) => {
        const { total, page, pages } = res.data.meta;
        this.books = res.data.items;
        this.currentPage = page;
        this.counts = total;
        this.pages = pages;
      }
    );
  }

  openAddBookModal() {
    this.dialog
      .open(AddBookComponent, { width: "500px" })
      .componentInstance.result.subscribe((data: any) => {
        this.addBook(data.data);
      });
  }

  private viewBook(data: object) {
    this.hrs.request(
      "get",
      "book/addBook",
      { params: { _id: "61f11c3e78a00d0f84df09e2" } },
      async (data: IResponse) => {
        if (data.success) {
          this.addInCurrentUserTable(data);
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

  private addBook(data: object) {
    this.hrs.request("post", "book/addBook", data, async (data: IResponse) => {
      if (data.success) {
        this.addInCurrentUserTable(data);
        this.books.pop();
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
    });
  }

  private addInCurrentUserTable(newBook: any) {
    this.books.unshift(newBook.data);
    this.counts += 1;
  }

  selectedCardFace = { face: "front", url: "" };

  public generateIdCard() {
    this.qrCodeUrl = "";
    this.barcodeUrl = "";

    // this.idCardBtn = true;
    this.hrs.request("put", "user/generateIdCard", {}, async (res: any) => {
      console.log(2342342342, res);
      if (res.success) {
        this.idCard.front = res.data.front_card;
        this.idCard.back = res.data.back_card;

        this.selectedCardFace.url = res.data.front_card.secure_url;
        this.selectedCardFace.face = "front";
      }

      this.idCardBtn = false;
    });
  }
  public flipIdCard() {
    if (this.selectedCardFace.face === "front") {
      this.selectedCardFace.url = this.idCard.back.secure_url;
      this.selectedCardFace.face = "back";
    } else {
      this.selectedCardFace.url = this.idCard.front.secure_url;
      this.selectedCardFace.face = "front";
    }
  }

  public generateQRCode() {
    this.selectedCardFace.url = "";
    this.barcodeUrl = "";

    this.qrBtn = true;
    this.hrs.request("put", "user/generateQR", {}, async (res: any) => {
      this.qrCodeUrl = res.data.url;
      this.qrBtn = false;
    });
  }

  public generateBarcode() {
    this.selectedCardFace.url = "";
    this.qrCodeUrl = "";

    this.barcodeBtn = true;
    this.hrs.request("put", "user/generateBarcode", {}, async (res: any) => {
      this.barcodeUrl = res.data.url;
      this.barcodeBtn = false;
    });
  }
}
