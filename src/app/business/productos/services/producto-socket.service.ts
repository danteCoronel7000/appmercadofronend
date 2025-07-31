import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoSocketService {
  private client: Client;
  public productoActualizado$: Subject<Producto> = new Subject();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', // tu endpoint en Spring
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        this.client.subscribe('/topic/productos', (message: IMessage) => {
          const producto = JSON.parse(message.body);
          this.productoActualizado$.next(producto); // notifica a tus componentes
        });
      }
    });

    this.client.activate();
  }
}
