//events.gateway.ts
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  }

  // you can listen to this event
  // Client can send message to me by using the message key/event name
  @SubscribeMessage('message')
  newMessage(
    @MessageBody()
    data: any,
  ): Observable<WsResponse<any>> {
    console.log('Message is receieved from the client');
    console.log(data);
    return of({ event: 'message', data: 'Learn Node' });
    //Here we dit not send a message back to the server
    //Save the message to database and return the reply in the response
    // Call the service method to save the record in the DB
  }
}
