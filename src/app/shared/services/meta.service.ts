import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  chaptersUpdated = new Subject<[]>();
  chapters: [];

  constructor(private http: HttpClient) {}

  getChapters() {
    return this.chapters;
  }
  fetchChapters() {
    this.http.get('https://segatools-api.azurewebsites.net/chapters').subscribe((response: []) => {
      this.chapters = response;
      this.chaptersUpdated.next(response);
    });
  }
}
