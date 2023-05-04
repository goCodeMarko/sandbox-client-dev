import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  @Output() result = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      stocks: ['0', [Validators.required]],
      price: ['0', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  save() {
    this.result.emit({ success: true, data: this.bookForm.value });
    this.close();
  }

  close() {
    this.dialog.close();
  }

  currencyStrict(event: any) {
    let pasteValue = [];
    const allowedInput = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (event.type == 'paste') {
      pasteValue = event.clipboardData.getData('text/plain').split('');
      pasteValue.forEach((char: string) => {
        if (!allowedInput.includes(char)) event.preventDefault();
      })
    } else {
      if (!allowedInput.includes(event.key)) event.preventDefault();
    }
  }

  stocksStrict(event: any) {
    let pasteValue = [];
    const allowedInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (event.type == 'paste') {
      pasteValue = event.clipboardData.getData('text/plain').split('');
      pasteValue.forEach((char: string) => {
        if (!allowedInput.includes(char)) event.preventDefault();
      })
    } else {
      if (!allowedInput.includes(event.key)) event.preventDefault();
    }
  }

}
