import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(public afs: AngularFirestore) {}

  obtenerMensajes$() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    return this.itemsCollection.valueChanges()
                               .pipe( map((mensajes: Mensaje[]) => {
                                 this.chats = mensajes;
                               }));
  }

  enviarMensaje( texto: string ) {
    const MENSAJE: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
      // TODO: Falta el uid del Usuario
    };

    return this.itemsCollection.add( MENSAJE );
  }
}
