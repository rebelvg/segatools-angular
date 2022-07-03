import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NamesResponse } from '../shared/models/namesResponse.model';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  listUpdated = new Subject<NamesResponse>();
  private list: NamesResponse;

  constructor() {}

  setNames(response) {
    this.list = response;
    this.listUpdated.next(this.list);
  }
}
