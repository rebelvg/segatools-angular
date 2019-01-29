import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LinesResponse } from '../shared/models/linesResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UniqueService {
  uniqueLines: LinesResponse;
  uniqueLinesUpdated = new Subject<LinesResponse>();
  constructor() {}

  setMessages(response: LinesResponse) {
    this.uniqueLines = response;
    this.uniqueLinesUpdated.next(this.uniqueLines);
  }
}
