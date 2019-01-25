import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MessagesResponse } from './models/messagesResponse.model';
import {} from 'lodash';
import { NamesService } from '../names/names.service';
import { HomeService } from '../home/home.service';
import { StatsResponse } from './models/statsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private messagesService: MessagesService,
    private http: HttpClient,
    private nameService: NamesService,
    private homeService: HomeService
  ) {}

  public fetchMessages(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data }
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

  public fetchMessage(id) {
    if (!id) {
      return;
    }
    this.http.get(`/api/messages/${id}`).subscribe(response => {
      this.messagesService.setMessage(response);
    });
  }

  public updateMessage(id, data) {
    const token = window.localStorage.getItem('token');

    if (!id || !token) {
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    this.http.post(`/api/messages/${id}`, data, { headers }).subscribe(response => {
      console.log(response);
    });
  }

  public fetchNames() {
    this.http
      .get('/api/names', {
        observe: 'body',
        responseType: 'json'
      })
      .subscribe(response => {
        console.log(response);
        this.nameService.setNames(response);
      });
  }

  public fetchStats() {
    this.http
      .get('/api/stats', {
        observe: 'body',
        responseType: 'json'
      })
      .subscribe((response: StatsResponse) => {
        this.homeService.setStats(response);
      });
  }

  public updateName(id) {}
}
