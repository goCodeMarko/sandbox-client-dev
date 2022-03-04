import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.css']
})
export class PopUpModalComponent implements OnInit {
  @Output() result = new EventEmitter();
  constructor(
    private dialog: MatDialogRef<PopUpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  delete() {
    this.result.emit(true);
    this.close();
  }

  close() {
    this.dialog.close();
  }

}
