import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DataService } from '../shared/services/data.service';
import { StatsResponse } from '../shared/models/statsResponse.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats: StatsResponse;
  init = false;
  subscription: Subscription;
  constructor(private homeService: HomeService, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchStats();
    this.subscription = this.homeService.statsUpdated.subscribe(stats => {
      this.stats = stats;
      this.init = true;
    });
  }
}
