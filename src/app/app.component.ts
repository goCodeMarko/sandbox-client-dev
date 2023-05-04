import { Component, OnInit, isDevMode } from '@angular/core';
import { io } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
    console.log(process.env.SERVER_URL)
    // const socket = io('http://localhost:3000');

    // socket.on('hello', (data) => {
    //   console.log(data)
    // })
  }
}
