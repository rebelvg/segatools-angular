import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { omit } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

import { MessagesService } from '../messages.service';
import { DataService } from '../../shared/data.service';
import { Pagination } from '../../shared/models/pagination.model';
import { MessagesQuery } from 'src/app/shared/models/messagesQuery.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  private messageSubscription: Subscription;
  init = false;
  loading = true;
  messages = [];
  query = new MessagesQuery();
  paginator = new Pagination(1, 20);

  constructor(
    private msgService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = new MessagesQuery(params);
      this.paginator.setPagination(params);
      this.fetchMessages();
    });
    this.messageSubscription = this.msgService.listUpdated.subscribe(response => {
      setTimeout(() => {
        this.init = true;
        this.messages = response.messages;
        this.loading = false;
        this.paginator.setPagination(omit(response, 'messages'));
      }, 0);
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  getParams = () => ({ ...this.paginator.getQuery(), ...this.query.params });

  fetchMessages() {
    const params = this.getParams();
    this.dataService.fetchMessages(params);
  }

  onPageChange(page) {
    this.loading = true;
    this.router.navigate(['/messages'], {
      queryParams: { ...this.getParams(), page: page }
    });
  }
}
