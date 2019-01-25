import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { omit } from 'lodash';

import { MessagesService } from '../messages.service';
import { DataService } from '../../shared/data.service';
import { Pagination } from '../../shared/models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  private messageSubscription: Subscription;
  private paginationSubscription: Subscription;
  init = false;
  loading = false;
  messages = [];
  pagination = new Pagination(1, 20);

  constructor(
    private msgService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pagination.page = params.page ? +params.page : this.pagination.page;
      this.pagination.limit = params.limit ? +params.page : this.pagination.limit;
      this.fetchMessages();
    });
    this.messageSubscription = this.msgService.listUpdated.subscribe(response => {
      setTimeout(() => {
        this.init = true;
        this.messages = response.messages;
        this.loading = false;
        this.pagination = omit(response, 'messages');
      }, 0);
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  fetchMessages() {
    this.dataService.fetchMessages({ page: this.pagination.page, limit: this.pagination.limit });
  }

  onPageChange(page) {
    this.loading = true;
    this.router.navigate(['/messages'], {
      queryParams: { page: page }
    });
  }
}
