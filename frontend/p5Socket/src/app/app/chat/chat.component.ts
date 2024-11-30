import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ChatComponent implements OnInit {
  username: string = '';
  message: string = '';
  messages: { user: string; text: string }[] = [];
  joined: boolean = false;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onUserJoined((msg) => this.messages.push({ user: 'Sistema', text: msg }));
    this.socketService.onReceiveMessage((msg) => this.messages.push(msg));
  }

  joinChat() {
    if (this.username.trim()) {
      this.socketService.joinChat(this.username);
      this.joined = true;
    }
  }

  sendMessage() {
    if (this.message.trim()) {
      const msg = { user: this.username, text: this.message };
      this.socketService.sendMessage(msg);
      //this.messages.push(msg); // Añadir al chat localmente
      this.message = '';
    }
  }
}
