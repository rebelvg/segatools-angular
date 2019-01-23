import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  public fetchMessages() {
    this.http
      .get('/api/messages', {
        observe: 'body',
        responseType: 'json'
      })
      .subscribe(messages => {
        this.messagesService.setMessages(<[]>messages);
      });
  }
}
