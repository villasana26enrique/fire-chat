import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if ( !user ) { return; }
      this.usuario.nombre = user.displayName;
      this.usuario.uid    = user.uid;
    });
  }

  login( proveedor: string ) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  obtenerMensajes$() {
    this.itemsCollection = this.afs.collection<Mensaje>( 'chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5) );
    return this.itemsCollection.valueChanges()
                               .pipe( map((mensajes: Mensaje[]) => {
                                  this.chats = [];
                                  for (let mensaje of mensajes) {
                                    this.chats.unshift( mensaje );
                                  }
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
