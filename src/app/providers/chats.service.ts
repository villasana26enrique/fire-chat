import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: any[] = [];

  constructor(private afs: AngularFirestore) {}

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<any>('chats');
    return this.itemsCollection.valueChanges();

  }
}
