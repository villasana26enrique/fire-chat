import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../providers/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  public mensaje = '';
  elemento: any;
  constructor(public _cs: ChatsService) {
    this._cs.obtenerMensajes$()
            .subscribe( () => {
              setTimeout(() => {
                this.elemento.scrollTop = this.elemento.scrollHeight;
              }, 20);
            });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
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
