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
    this._cs.obtenerMensajes$()
            .subscribe();
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) { return; }
    this._cs.enviarMensaje( this.mensaje )
        .then(() => {
          this.mensaje = '';
          console.log('Mensaje enviado');
        })
        .catch( (err) => console.error('Error al enviar', err) );
  }

}
