import { Injectable } from '@angular/core';
import { StatsResponse } from '../shared/models/statsResponse.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public statsUpdated = new Subject<StatsResponse>();
  stats: StatsResponse;
  constructor() {}

  setStats(stats: StatsResponse) {
    this.stats = stats;
    this.statsUpdated.next(this.stats);
  }
}
