import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../providers/chats.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _cs: ChatsService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string) {
    this._cs.login( proveedor );
  }

}
