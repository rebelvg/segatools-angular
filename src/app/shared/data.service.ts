import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MessagesResponse } from './models/messagesResponse.model';
import {} from 'lodash';
import { NamesService } from '../names/names.service';
import { HomeService } from '../home/home.service';
import { StatsResponse } from './models/statsResponse.model';
import { NotifierService } from 'angular-notifier';
import { Name } from './models/name.model';
import { UniqueService } from '../unique/unique.service';
import { LinesResponse } from './models/linesResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private messagesService: MessagesService,
    private uniqueService: UniqueService,
    private http: HttpClient,
    private nameService: NamesService,
    private homeService: HomeService,
    private notifier: NotifierService
  ) {}

  private handleErrorResponse(response) {
    if (!response.error) {
      this.notifier.notify('error', `Failed (${response.status}). Error occured`);
      return;
    }

    this.notifier.notify('error', `Failed (${response.status}). Error: ${response.error}`);
    return;
  }

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
        this.messagesService.setMessages(response);
      }, this.handleErrorResponse);
  }

  public updateMessage(id: string, data: {}) {
    const token = window.localStorage.getItem('token');

    if (!id || !token) {
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    this.http.post(`/api/messages/${id}`, data, { headers }).subscribe((response: { messagesUpdated: number }) => {
      this.notifier.notify('success', `Messages saved succesfully. Messages updated: ${response.messagesUpdated}`);
    }, this.handleErrorResponse);
  }

  public fetchMessage(id) {
    if (!id) {
      return;
    }
    this.http.get(`/api/messages/${id}`).subscribe(response => {
      this.messagesService.setMessage(response);
    }, this.handleErrorResponse);
  }

  public fetchNames(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data }
    });
    this.http
      .get('/api/names', {
        observe: 'body',
        responseType: 'json',
        params
      })
      .subscribe(response => {
        this.nameService.setNames(response);
      }, this.handleErrorResponse);
  }

  public fetchStats() {
    this.http
      .get('/api/stats', {
        observe: 'body',
        responseType: 'json'
      })
      .subscribe((response: StatsResponse) => {
        console.log(response);
        this.homeService.setStats(response);
      }, this.handleErrorResponse);
  }

  public updateName(id: string, data: { english: string }) {
    const token = window.localStorage.getItem('token');

    if (!id || !token) {
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    this.http.post(`/api/names/${id}`, data, { headers }).subscribe((response: { name: Name }) => {
      this.notifier.notify(
        'success',
        `Name #${response.name.nameId} updated successfully! ${response.name.japanese}(${response.name.english})`
      );
    }, this.handleErrorResponse);
  }

  public fetchUniqueLines(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data }
    });
    this.http
      .get('/api/lines', {
        observe: 'body',
        responseType: 'json',
        params
      })
      .subscribe((response: LinesResponse) => {
        this.uniqueService.setMessages(response);
      }, this.handleErrorResponse);
  }

  public updateUniqueLine(id: string, data: {}) {
    const token = window.localStorage.getItem('token');

    if (!id || !token) {
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    this.http.post(`/api/lines/${id}`, data, { headers }).subscribe((response: { messagesUpdated: number }) => {
      this.notifier.notify('success', `Messages saved succesfully. Messages updated: ${response.messagesUpdated}`);
    }, this.handleErrorResponse);
  }
}
