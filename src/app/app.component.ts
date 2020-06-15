import { Component } from '@angular/core';
import { ChatsService } from './providers/chats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fire-chat';
  constructor( public _cs: ChatsService ) { }
}
