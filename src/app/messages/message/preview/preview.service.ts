import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  public messageSet = new Subject<string>();
  private message: string;
  constructor() {}

  setMessage(message) {
    this.message = message;
    this.messageSet.next(message);
  }
}
