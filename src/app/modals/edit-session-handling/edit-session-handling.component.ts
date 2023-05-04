import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-session-handling',
  templateUrl: './edit-session-handling.component.html',
  styleUrls: ['./edit-session-handling.component.css']
})
export class EditSessionHandlingComponent implements OnInit {
  accessrights: FormGroup;
  @Output() result = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditSessionHandlingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accessrights = this.fb.group({
      isallowedtodelete: [''],
      isallowedtocreate: [''],
      isallowedtoupdate: [''],
      isblock: [''],
      _id: ['']
    })
  }

  ngOnInit(): void {
    this.accessrights.setValue({
      isallowedtodelete: this.data.isallowedtodelete,
      isallowedtocreate: this.data.isallowedtocreate,
      isallowedtoupdate: this.data.isallowedtoupdate,
      isblock: this.data.isblock,
      _id: this.data._id
    })
  }

  save() {
    this.result.emit(this.accessrights.value);
    this.close();
  }

  close() {
    this.dialog.close();
  }

}
