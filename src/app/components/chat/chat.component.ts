import { Component } from '@angular/core';
import { ChatsService } from '../../providers/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  public mensaje = '';
  constructor(private _cs: ChatsService) {
    this._cs.cargarMensajes()
            .subscribe( (mensajes: any[]) => {
              console.log(mensajes);
            });
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
