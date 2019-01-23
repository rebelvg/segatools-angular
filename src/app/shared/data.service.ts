import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessagesResponse } from './models/messagesResponse.model';
import {} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private messagesService: MessagesService, private http: HttpClient) {}

  public fetchMessages(data) {
    const params = new HttpParams({
      fromObject: {}
    });
    this.http
      .get('/api/messages', {
        observe: 'body',
        responseType: 'json',
        params
      })
      .subscribe((response: MessagesResponse) => {
        console.log(response);
        this.messagesService.setMessages(response);
      });
  }
}
