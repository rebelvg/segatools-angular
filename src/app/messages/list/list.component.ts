import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { omit } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

import { MessagesService } from '../messages.service';
import { DataService } from '../../shared/services/data.service';
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
    this.route.queryParams.subscribe(() => {
      this.query = new MessagesQuery();
      this.paginator.setPagination();
      this.fetchMessages();
    });
    this.messageSubscription = this.msgService.listUpdated.subscribe(response => {
      setTimeout(() => {
        this.init = true;
        this.messages = response.messages;
        this.loading = false;
        this.paginator.setPaginatorData(response);
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
    console.log(params);
    this.dataService.fetchMessages(params);
  }

  onPageChange(page) {
    this.loading = true;
    const params = this.query.stringify({ ...this.paginator.getQuery(), ...this.query.params, page: page });

    const url = `/messages?${params}`;
    this.router.navigateByUrl(url);
  }
}
