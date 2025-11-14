import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { Ventas } from '../models/ventas.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaSocketService {

  
  private client: Client;
  public ventaActualizada$: Subject<Ventas> = new Subject();

  constructor() {
    this.client = this.createClient();
    this.client.activate();
  }

  /**
   * Configura y devuelve el cliente STOMP
   */
  private createClient(): Client {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        client.subscribe('/topic/ventas', (message: IMessage) => {
          const venta: Ventas = JSON.parse(message.body);
          this.ventaActualizada$.next(venta); // Notifica a los componentes suscritos
        });
      }
    });

    return client;
  }

  /**
   * Desactiva el cliente WebSocket
   */
  disconnect(): void {
    if (this.client && this.client.active) {
      this.client.deactivate();
    }
  }
}
