import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import {ChatService} from '../../service/chat.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  username = 'username';
  message = '';
  messages = [];

  constructor(private chatService: ChatService,
              private http: HttpClient) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('20bd872453e71562cbc9', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('mess', data => {
      this.messages.push(data);
    });
    console.log(this.messages)
  }

  submit(): void {
    this.http.post('http://localhost:8080/chat', {
      name: this.username,
      mess: this.message
    }).subscribe(() => this.message = '');
  }
}
