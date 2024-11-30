import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinChat(username: string) {
    this.socket.emit('join-chat', username);
  }

  sendMessage(message: { user: string; text: string }) {
    this.socket.emit('send-message', message);
  }

  onUserJoined(callback: (message: string) => void) {
    this.socket.on('user-joined', callback);
  }

  onReceiveMessage(callback: (message: { user: string; text: string }) => void) {
    this.socket.on('receive-message', callback);
  }
}
