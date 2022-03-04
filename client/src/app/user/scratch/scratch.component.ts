import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.css']
})
export class ScratchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Welcome to the battleground')
  }


}
