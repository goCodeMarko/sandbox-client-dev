import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: object = {};

  public storages = [];
  public mfrows: number = 10;
  public searchBox: string = "";
  public skip: number = 0;
  public limit: number = this.mfrows;
  public pageNo: number = 1;
  public startPN: number = 1;
  public endNum: number = 10;
  public startNum: number = 1;
  public totalStorages: number = 0;
  public isSearch: boolean = false;
  public loadingList: boolean = false;
  public loadingTotal: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
