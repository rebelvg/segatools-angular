import { Injectable } from '@angular/core';
import { MessagesService } from '../../messages/messages.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MessagesResponse } from '../models/messagesResponse.model';
import qs from 'query-string';
import { NamesService } from '../../names/names.service';
import { HomeService } from '../../home/home.service';
import { StatsResponse } from '../models/statsResponse.model';
import { NotifierService } from 'angular-notifier';
import { Name } from '../models/name.model';
import { UniqueService } from '../../unique/unique.service';
import { LinesResponse } from '../models/linesResponse.model';
import { AuthService } from './auth.service';
import { AdminService } from 'src/app/admin/admin.service';
import { User } from '../models/user.model';
import { Subject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public refetcher = new Subject();
  constructor(
    private messagesService: MessagesService,
    private authService: AuthService,
    private uniqueService: UniqueService,
    private http: HttpClient,
    private admin: AdminService,
    private nameService: NamesService,
    private homeService: HomeService,
    private notifier: NotifierService,
  ) {}

  private handleErrorResponse = (response) => {
    if (!response.error) {
      this.notifier.notify('error', `Error occurred.`);
      return;
    }

    this.notifier.notify('error', `Error: ${response.error}`);
    return;
  };

  public fetchMessages(data: {}) {
    const params = new HttpParams({
      fromString: qs.stringify(data, { arrayFormat: 'bracket' }),
    });

    this.http
      .get(`${environment.API_BASE_URL}/messages`, {
        observe: 'body',
        responseType: 'json',
        params,
      })
      .subscribe((response: MessagesResponse) => {
        this.messagesService.setMessages(response);
      }, this.handleErrorResponse);
  }

  public updateMessage(id: string, data: {}, cb: Function = () => {}) {
    if (!id) {
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    return this.http
      .post(`${environment.API_BASE_URL}/messages/${id}`, data, {
        headers,
      })
      .subscribe((response: { messagesUpdated: number }) => {
        this.notifier.notify(
          'success',
          `Messages saved successfully. Messages updated: ${response.messagesUpdated}`,
        );
        cb();
        this.fetchMessage(id);
      }, this.handleErrorResponse);
  }

  public translateViaGPT(message: string, index: any) {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    return this.http
      .post(
        `${environment.API_BASE_URL}/translateGTP`,
        { message },
        {
          headers,
        },
      )
      .subscribe((response: { message }) => {
        console.log(message);
        this.messagesService.updateLineByIndex(index, { english: message });
      }, this.handleErrorResponse);
  }

  public fetchMessage(id) {
    if (!id) {
      return;
    }

    this.http
      .get(`${environment.API_BASE_URL}/messages/${id}`)
      .subscribe((response) => {
        this.messagesService.setMessage(response);
      }, this.handleErrorResponse);
  }

  public fetchNames(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data },
    });

    this.http
      .get(`${environment.API_BASE_URL}/names`, {
        observe: 'body',
        responseType: 'json',
        params,
      })
      .subscribe((response) => {
        this.nameService.setNames(response);
      }, this.handleErrorResponse);
  }

  public fetchStats() {
    this.http
      .get(`${environment.API_BASE_URL}/stats`, {
        observe: 'body',
        responseType: 'json',
      })
      .subscribe((response: StatsResponse) => {
        this.homeService.setStats(response);
      }, this.handleErrorResponse);
  }

  public updateName(id: string, data: { english: string }) {
    if (!id) {
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    this.http
      .post(`${environment.API_BASE_URL}/names/${id}`, data, {
        headers,
      })
      .subscribe((response: { name: Name }) => {
        this.notifier.notify(
          'success',
          `Name #${response.name.nameId} updated successfully! ${response.name.japanese}(${response.name.english})`,
        );
      }, this.handleErrorResponse);
  }

  public fetchEnglishLines(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data },
    });

    this.http
      .get(`${environment.API_BASE_URL}/lines/english`, {
        observe: 'body',
        responseType: 'json',
        params,
      })
      .subscribe((response: LinesResponse) => {
        this.uniqueService.setMessages(response);
      }, this.handleErrorResponse);
  }

  public fetchUniqueLines(data: {}) {
    const params = new HttpParams({
      fromObject: { ...data },
    });

    this.http
      .get(`${environment.API_BASE_URL}/lines`, {
        observe: 'body',
        responseType: 'json',
        params,
      })
      .subscribe((response: LinesResponse) => {
        this.uniqueService.setMessages(response);
      }, this.handleErrorResponse);
  }

  public updateUniqueLine(data: {}) {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);
    this.http
      .post(`${environment.API_BASE_URL}/lines/update`, data, {
        headers,
      })
      .subscribe((response: { messagesUpdated: number }) => {
        this.notifier.notify(
          'success',
          `Unique Lines were updated: ${response.messagesUpdated}`,
        );
      }, this.handleErrorResponse);
  }

  public replaceLine(data: {}, isEnglish: boolean) {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    this.http
      .post(`${environment.API_BASE_URL}/lines/replace`, data, {
        headers,
      })
      .subscribe((response: { messagesUpdated: number }) => {
        this.notifier.notify('success', `Text was replaced`);
        this.refetcher.next();
      }, this.handleErrorResponse);
  }

  public fetchUsers() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    this.http
      .get(`${environment.API_BASE_URL}/admin/users`, {
        observe: 'body',
        responseType: 'json',
        headers,
      })
      .subscribe((response: { users: User[] }) => {
        this.admin.setUsers(response.users);
      }, this.handleErrorResponse);
  }

  public updateUser(id: string, data: any) {
    if (!id) {
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('token', token);

    this.http
      .post(`${environment.API_BASE_URL}/admin/users/${id}`, data, {
        headers,
      })
      .subscribe((response) => {
        this.notifier.notify('success', `User updated`);
      }, this.handleErrorResponse);
  }
}
