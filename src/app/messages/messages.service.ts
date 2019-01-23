import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subject } from 'rxjs';
import { MessagesResponse } from '../shared/models/messagesResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messagesUpdated = new Subject<[]>();
  private messages: [];
  params = {
    page: 1,
    limit: null
  };
  pagination = {
    total: null,
    pages: null
  };
  total: null;

  constructor() {}

  setPage(page: number) {
    this.params.page = page;
  }

  setMessages(response: MessagesResponse) {
    const { messages, page, pages, limit, total } = response;
    this.messages = messages;
    this.params = { page, limit };
    this.pagination = { total, pages };
    this.messagesUpdated.next(this.messages);
  }
}
