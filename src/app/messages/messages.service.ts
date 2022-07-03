import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagesResponse } from '../shared/models/messagesResponse.model';
import { Message } from '../shared/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  listUpdated = new Subject<MessagesResponse>();
  singleMessageUpdated = new Subject<Message>();
  private list: MessagesResponse;
  private single: Message;

  constructor() {}

  setPage(page: number) {
    this.list.page = page;
    this.listUpdated.next(this.list);
  }

  setMessages(response: MessagesResponse) {
    this.list = response;
    this.listUpdated.next(this.list);
  }

  setMessage(response) {
    this.single = response;
    this.singleMessageUpdated.next(response);
  }
}
