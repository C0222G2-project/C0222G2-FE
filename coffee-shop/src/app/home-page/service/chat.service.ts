import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly API_CHAT_URL = 'http://localhost:8080/chat';

  constructor(private httpClient: HttpClient) { }

  getAllChat():Observable<Message[]>{
    return this.httpClient.get<Message[]>(this.API_CHAT_URL);
  }

  addChat(mess){
    return this.httpClient.post(this.API_CHAT_URL, mess);
  }
}
