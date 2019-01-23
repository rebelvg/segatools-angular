import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messagesUpdated = new Subject<{}>();
  private messages: [];
  params: {
    page: 1;
    limit: null;
  };
  total: null;

  constructor() {}

  setMessages(messages: []) {
    console.log(messages);
    this.messages = messages;
    this.messagesUpdated.next(this.messages);
  }
}
